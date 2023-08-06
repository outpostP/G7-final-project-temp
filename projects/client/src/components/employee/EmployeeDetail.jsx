import { Avatar, Button, Switch, Td, Tr } from "@chakra-ui/react";

export const EmployeeDetail = () => {
  return (
    <>
      <Tr>
        <Td>1</Td>
        <Td>
          <Button variant="unstyled">
            <Avatar size="md" name="Cashier Name" src="/logo192.png" />
          </Button>
        </Td>
        <Td>test</Td>
        <Td>test@mailsac.com</Td>
        <Td>
          <Button colorScheme="blue">Change</Button>
        </Td>
        <Td>
          <Button colorScheme="blue">Edit</Button>
        </Td>
        <Td>
          <Switch colorScheme="teal" />
        </Td>
      </Tr>
    </>
  );
};
