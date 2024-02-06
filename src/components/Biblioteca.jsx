import {
  Box,
  Flex,
} from "@chakra-ui/react"
import { GoPlus } from "react-icons/go"
import { IoLibrary } from "react-icons/io5"
import { usePlaylist } from "../hooks/playlistHook/usePlaylist"
import { PlaylistGrid } from "./PlaylistGrid"
import { FirstPlaylist } from "./FirstPlaylist"


export const Biblioteca = () => {

  const { handleGetUserPlaylists, handleCreatePlaylist, isCreating, userPlaylists } = usePlaylist()

  return (
    <>
      <Box
        p="15px 10px"
        bg="#131213"
        w="25em"
        h="81vh"
        borderRadius="7px"
        marginTop="10px"
        boxSizing="border-box"
        overflow="scroll"
      >
        <Flex
          color="#b3b3b3"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontSize="1em"
          fontWeight="600"
          cursor="pointer"
          p="3px 15px"
        >
          <Box display="flex">
            <IoLibrary
              style={{
                color: "b3b3b3",
                marginRight: "20px",
                width: "25px",
                height: "25px",
              }}
            />
            Tu Biblioteca
          </Box>
          <GoPlus
            style={{ width: "23px", height: "23px" }}
            onClick={handleCreatePlaylist}
          />
        </Flex>
        <PlaylistGrid 
          userPlaylists={userPlaylists}
          handleGetUserPlaylists={handleGetUserPlaylists}
        />
        <FirstPlaylist 
          handleCreatePlaylist={handleCreatePlaylist}
          isCreating={isCreating}
          userPlaylists={userPlaylists}
        />
      </Box>
    </>
  )
}
