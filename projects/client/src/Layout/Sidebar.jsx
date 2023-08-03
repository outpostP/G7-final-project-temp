import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";

const SidebarForm = () => {
  return (
    <>
      <Box>
        <Sidebar isAdmin={false} />
      </Box>
    </>
  );
};

export default SidebarForm;
