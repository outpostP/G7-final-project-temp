import React from "react";
import {
  Avatar,
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
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { SidebarIcon } from "./SidebarIcon";
import { useNavigate } from "react-router-dom";

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
      <Box borderWidth="1px" w="110px" h="100vh" pb="50px">
        <Flex h="full" flexDirection="column" alignItems="center">
          <Wrap pt="20px" pb="100px">
            <WrapItem>
              <Button w={"full"} variant="unstyled">
                <Avatar
                  size="xl"
                  name="Cashier Name"
                  src="/image/foodlogo.png"
                />
              </Button>
            </WrapItem>
          </Wrap>
          <SidebarIcon data={isAdmin} />
          <Spacer />
          <List spacing="25px">
            <ListItem>
              <Button w={"full"} variant="unstyled" onClick={() => {}}>
                <Icon as={IoSettingsOutline} boxSize={"full"} />
              </Button>
            </ListItem>
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
