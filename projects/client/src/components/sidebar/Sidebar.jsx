import React from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  List,
  ListItem,
  Spacer,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { SidebarIcon } from "./SidebarIcon";
import { useNavigate } from "react-router-dom";
import { ChangeAvatarSidebar } from "./ChangeAvatarSidebar";

export const Sidebar = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogoutToast = () => {
    toast({
      description: "Successfully logged out",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  const logout = () => {
    navigate("/");
    handleLogoutToast();
    localStorage.clear();
  };

  return (
    <>
      <Box borderWidth="1px" w="120px" h="100vh" pb="70px">
        <Flex h="full" flexDirection="column" alignItems="center">
          <Wrap pt="10px" pb="70px">
            <WrapItem>
              <ChangeAvatarSidebar />
            </WrapItem>
          </Wrap>
          <SidebarIcon data={isAdmin} />
          <Spacer />
          <List>
            <ListItem>
              <Button w={"full"} variant="unstyled" onClick={logout}>
                <Icon as={IoLogOutOutline} boxSize={"full"} />
              </Button>
            </ListItem>
          </List>
        </Flex>
      </Box>
    </>
  );
};