import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@chakra-ui/react";
const isLogin = localStorage.getItem("token");
const Homepage = () => {
  return (
    <Box display="flex">
      {isLogin && <Sidebar />}
      <Box flex="1">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Homepage;
