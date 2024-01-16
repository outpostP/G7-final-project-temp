import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./Sidebar";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
const Homepage = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(()=> {

    console.log('isAdmin', isAdmin)
  },[])
  useEffect(() => {
    function checkIsAdmin() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.isAdmin === true;
      }
      return false;
    }

    setIsAdmin(checkIsAdmin());
  }, []);
  
  return (
    <Box display="flex">
      <Box position={"fixed"}>
        <Sidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
      </Box>
      <Box flex="1" marginLeft="120px">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Homepage;