import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@chakra-ui/react";
const Homepage = () => {
  return (
    <Box display="flex">
      <Box position={"fixed"}>
        <Sidebar />
      </Box>
      <Box flex="1" marginLeft="120px">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Homepage;
