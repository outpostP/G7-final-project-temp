import { Avatar, Button, Switch, Td, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCashier } from "../../services/reducer/employeeReducer";

export const EmployeeDetail = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.dataEmployee.dataUser);

  useEffect(() => {
    dispatch(getAllCashier());
  }, []);

  return result.map((item, index) => {
    return (
      <>
        <Tr key={item.id}>
          <Td>{index + 1}</Td>
          <Td>
            <Button variant="unstyled">
              <Avatar
                size="md"
                name={item.username}
                src={item.User_Profile.avatar}
              />
            </Button>
          </Td>
          <Td>{item.username}</Td>
          <Td>{item.email}</Td>
          <Td>
            <Button colorScheme="blue">Change</Button>
          </Td>
          <Td>
            <Button colorScheme="blue">Edit</Button>
          </Td>
          <Td>
            <Switch colorScheme="teal" isChecked={item.User_Profile.isActive} />
          </Td>
        </Tr>
      </>
    );
  });
};
