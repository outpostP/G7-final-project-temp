import { Box } from "@chakra-ui/react";
import { Sidebar } from "../../sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const SidebarForm = () => {
  const path = useLocation();
  const showSidebar =
    path.pathname === "/" || path.pathname.includes("/reset-password");

  return (
    <>
      <Box>{!showSidebar && <Sidebar />}</Box>
    </>
  );
};

export default SidebarForm;