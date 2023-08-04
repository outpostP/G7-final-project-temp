import { Box } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const SidebarForm = () => {
  const path = useLocation();
  const showSidebar = path.pathname === "/";

  return (
    <>
      <Box>{!showSidebar && <Sidebar />}</Box>
    </>
  );
};

export default SidebarForm;
