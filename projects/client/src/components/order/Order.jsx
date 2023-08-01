// OrderPage.js
import React from "react";
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

export const Order = () => {
  return (
    <Flex>
      <Box w="100px" h="100vh" py={4} px={2}>
        <List spacing={2} pl={4}>
          <ListItem>
            <Text fontWeight="bold" fontSize="lg">
              HOME
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold" fontSize="lg">
              MENU
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold" fontSize="lg">
              REPORT
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold" fontSize="lg">
              SETTING
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold" fontSize="lg">
              LOGOUT
            </Text>
          </ListItem>
        </List>
      </Box>

      <Box bg="gray.100" borderWidth={"1px"} flex={3} p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Order Details
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
