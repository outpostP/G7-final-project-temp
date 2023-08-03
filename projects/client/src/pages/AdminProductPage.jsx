import { Box } from "@chakra-ui/react";
import React from "react";
import { Order } from "../components/cashier/Order";
import { Sidebar } from "../components/sidebar/Sidebar";

const OrderPage = () => {
  return (
    <Box>
      <Sidebar />
      <Order />
    </Box>
  );
};

export default OrderPage;
