import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import{useAuthAPI} from '@/hooks/auth/useAuthAPI.jsx'
import { fetchDetailsPlaylist } from '@spotify/playlistsService.js'
import { Box, Image,Heading } from '@chakra-ui/react'
import TableMusic from "../../components/TableMusic";

export default function Playlist(){
    const {id} = useParams()
    const [playlist, setPlaylist] = useState()
    const [isLoading, setLoading] = useState(true)
    const {token, getToken} = useAuthAPI()

    useEffect(()=>{
        const tokenExpiration = localStorage.getItem('tokenExpiration')
        console.log(id)
        if(!token || Date.now() > tokenExpiration){
            getToken().then((tk)=>{
                fetchDetailsPlaylist(tk,id).then(data =>{
                    setPlaylist(data)
                })
                .finally(setLoading(false))
            })
        }else{
            fetchDetailsPlaylist(token,id).then(data =>{
                setPlaylist(data)
                console.log(data)
            }).finally(setLoading(false))
          
        }
        

    },[])

    return(
        <>
            {!isLoading && playlist && (
                <Box
                    overflow='auto'
                >
                    <header>
                        <Box
                            display='flex'
                            color='white'
                            width='100%'
                            height='35vh'
                            justifyContent='start'
                            alignItems='end'
                            p='20px 40px'
                        >

                            <Box
                                w='270px'
                                marginRight={10}
                                boxShadow='0 0 25px black'
                            >
                                <img style={{borderRadius: '5px'}} src={playlist.images[0].url} alt="Imagen PlayList"></img>
                            </Box>
                            <div>
                                <p>Lista</p>
                                <Heading fontSize='6em'>{playlist.name}</Heading>
                                <p>{playlist.description}</p>
                                <p style={{fontWeight: 'bold', marginTop: '10px'}}>{playlist.owner.display_name} • {playlist.followers.total} me gusta • {playlist.tracks.total} canciones</p>
                            </div>
                        </Box>
                    </header>
                    <section style={{padding: '20px'}}>
                        <TableMusic tracks = {playlist.tracks.items}></TableMusic>
                    </section>

                    
                </Box>
            )}
        </>
    )



}