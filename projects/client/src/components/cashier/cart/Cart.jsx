// OrderPage.js
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

export const Cart = () => {
  return (
    <>
      <Flex>
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
    </>
  );
};
