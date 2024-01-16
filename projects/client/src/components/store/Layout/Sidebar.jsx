import { Box } from "@chakra-ui/react";
import { Sidebar } from "../../sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const SidebarForm = ({isAdmin, setIsAdmin}) => {
  console.log('sidebarform', isAdmin)
  const path = useLocation();
  const showSidebar =
    path.pathname === "/" || path.pathname.includes("/reset-password");

  return (
    <>
      <Box>{!showSidebar && <Sidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}</Box>
    </>
  );
};

export default SidebarForm;