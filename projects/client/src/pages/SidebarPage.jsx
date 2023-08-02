import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";

const SidebarPage = () => {
  return (
    <>
      <Box>
        <Sidebar data={"admin"} />
      </Box>
    </>
  );
};

export default SidebarPage;
