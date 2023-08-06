import {
  Avatar,
  Box,
  Button,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EmployeeDetail } from "./EmployeeDetail";
import { AddCashierModal } from "./AddCashier";
import { useState } from "react";

export const Employee = () => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };
  return (
    <>
      <Box padding={7}>
        <Button colorScheme="blue" onClick={openRegisterModal}>
          Add Cashier
        </Button>
        <AddCashierModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
        />
      </Box>
      <TableContainer borderWidth={2}>
        <Table size="md" variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th width="fit-content" color={"blue.500"}>
                No
              </Th>
              <Th width="fit-content" color={"blue.500"}>
                Avatar
              </Th>
              <Th width="50%" color={"blue.500"}>
                Username
              </Th>
              <Th width="50%" color={"blue.500"}>
                Email
              </Th>
              <Th width="fit-content" color={"blue.500"}>
                Password
              </Th>
              <Th width="fit-content" color={"blue.500"}>
                Action
              </Th>
              <Th width="fit-content" color={"blue.500"}>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <EmployeeDetail />
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
