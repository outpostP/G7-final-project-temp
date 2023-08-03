import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  List,
  ListItem,
  Spacer,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { SidebarIcon } from "./SidebarIcon";

export const Sidebar = (data) => {
  return (
    <>
      <Box borderWidth="1px" w="110px" h="100vh" pb="50px">
        <Flex h="full" flexDirection="column" alignItems="center">
          <Wrap pt="30px" pb="70px">
            <WrapItem>
              <Avatar size="xl" name="Cashier Name" src="/image/foodlogo.png" />
            </WrapItem>
          </Wrap>
          <SidebarIcon data={data.isAdmin} />
          <Spacer />
          <List spacing="20px">
            <ListItem>
              <Icon as={IoSettingsOutline} boxSize={10} />
            </ListItem>
            <ListItem>
              <Icon as={IoLogOutOutline} boxSize={10} />
            </ListItem>
          </List>
        </Flex>
      </Box>
    </>
  );
};
