import React from "react";
import { Button, Icon, List, ListItem } from "@chakra-ui/react";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";

export const SidebarIcon = (isAdmin) => {
  if (isAdmin.data) {
    return (
      <>
        <List spacing="25px">
          <ListItem>
            <Button w={"full"} variant="unstyled">
              <Icon as={TbCategory} boxSize={10} />
            </Button>
          </ListItem>
          <ListItem>
            <Button w={"full"} variant="unstyled">
              <Icon as={MdOutlineProductionQuantityLimits} boxSize={10} />
            </Button>
          </ListItem>
          <ListItem>
            <Button w={"full"} variant="unstyled">
              <Icon as={BsPeople} boxSize={10} />
            </Button>
          </ListItem>
          <ListItem>
            <Button w={"full"} variant="unstyled">
              <Icon as={TbReportAnalytics} boxSize={10} />
            </Button>
          </ListItem>
        </List>
      </>
    );
  } else {
    return (
      <>
        <List spacing="20px">
          <ListItem>
            <Button w={"full"} variant="unstyled">
              <Icon as={IoFastFoodOutline} boxSize={10} />
            </Button>
          </ListItem>
        </List>
      </>
    );
  }
};
