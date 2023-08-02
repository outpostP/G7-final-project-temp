import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  List,
  ListItem,
  Spacer,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  IoFastFoodOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import { TbCategory } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";

export const SidebarIcon = (isAdmin) => {
  if (isAdmin.data === "admin") {
    return (
      <>
        <List spacing="20px">
          <ListItem>
            <Icon as={TbCategory} boxSize={10} />
          </ListItem>
          <ListItem>
            <Icon as={MdOutlineProductionQuantityLimits} boxSize={10} />
          </ListItem>
          <ListItem>
            <Icon as={BsPeople} boxSize={10} />
          </ListItem>
          <ListItem>
            <Icon as={TbReportAnalytics} boxSize={10} />
          </ListItem>
        </List>
      </>
    );
  } else {
    return (
      <>
        <List spacing="20px">
          <ListItem>
            <Icon as={IoFastFoodOutline} boxSize={10} />
          </ListItem>
        </List>
      </>
    );
  }
};
