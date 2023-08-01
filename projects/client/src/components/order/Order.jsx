// OrderPage.js
import React from "react";
import {
  Box,
  Flex,
  Icon,
  Image,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { GoHome } from "react-icons/go";
import {
  IoFastFoodOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export const Order = () => {
  return (
    <Flex>
      <Box w="120px" h="100vh" pb="50px">
        <Flex h="full" flexDirection="column">
          <Image pb={"40px"} src="/image/foodlogo.png" />
          <List spacing="20px">
            <ListItem>
              <Icon as={GoHome} boxSize={10} />
            </ListItem>
            <ListItem>
              <Icon as={IoFastFoodOutline} boxSize={10} />
            </ListItem>
          </List>
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

      <Box bg="gray.100" borderWidth={"1px"} flex={3} p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Menu
        </Text>
      </Box>
      <Box borderWidth={"1px"} flex={1.5} p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Cart
        </Text>
      </Box>
    </Flex>
  );
};
