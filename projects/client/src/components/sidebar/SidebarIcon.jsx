import { jwtDecode } from "jwt-decode";
import { Button, Icon, List, ListItem } from "@chakra-ui/react";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const SidebarIcon = () => {
  const token = localStorage.getItem('token')
  const decode = jwtDecode(token)
  const isAdmin = decode.isAdmin
  const navigate = useNavigate();
  const toEmployee = () => {
    navigate("/admin");
  };
  const toProduct = () => {
    navigate("/admin/products");
  };
  const toReport = () => {
    navigate("/admin/reports");
  };
  const toCategory = () => {
    navigate("/admin/category");
  };

  if (isAdmin) {
    return (
      <>
        <List spacing="25px">
          <ListItem>
            <Button w={"full"} variant="unstyled" onClick={toEmployee}>
              <Icon as={BsPeople} boxSize={10} />
            </Button>
          </ListItem>
          <ListItem>
            <Button w={"full"} variant="unstyled" onClick={toCategory}>
              <Icon as={TbCategory} boxSize={10} />
            </Button>
          </ListItem>
          <ListItem>
            <Button w={"full"} variant="unstyled" onClick={toProduct}>
              <Icon as={MdOutlineProductionQuantityLimits} boxSize={10} />
            </Button>
          </ListItem>
          <ListItem>
            <Button w={"full"} variant="unstyled" onClick={toReport}>
              <Icon as={TbReportAnalytics} boxSize={10} />
            </Button>
          </ListItem>
        </List>
      </>
    );
  } else {
    return (
      <>
        <List spacing="20px">
          <ListItem>
            <Button w={"full"} variant="unstyled">
              <Icon as={IoFastFoodOutline} boxSize={10} />
            </Button>
          </ListItem>
        </List>
      </>
    );
  }
};