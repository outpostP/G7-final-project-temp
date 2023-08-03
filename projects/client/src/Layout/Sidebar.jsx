import { Box } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const SidebarForm = () => {
  const path = useLocation();
  const showSidebar = path.pathname === "/";

  const dataAdmin = localStorage.getItem("isAdmin") ? true : false;

  return (
    <>
      <Box>{!showSidebar && <Sidebar isAdmin={dataAdmin} />}</Box>
    </>
  );
};

export default SidebarForm;
