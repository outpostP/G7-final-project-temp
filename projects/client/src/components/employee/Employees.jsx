import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Center,
  Th,
  Thead,
  Tr,
  Flex,
} from "@chakra-ui/react";
import { EmployeeDetail } from "./EmployeeDetail";
import { AddCashierModal } from "./AddCashier";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCashier } from "../../services/reducer/employeeReducer";

export const Employee = () => {
  const result = useSelector((state) => state.dataEmployee.totalPage);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = result;
  // console.log(`testtttt${totalPage}`)
  const dispatch = useDispatch();

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCashier(currentPage));
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Box padding={5}>
        <Button colorScheme="teal" onClick={openRegisterModal}>
          Add Cashier
        </Button>
        <AddCashierModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
        />
      </Box>
      <TableContainer borderWidth={2}>
        <Table
          size={{ base: "sm", md: "md" }}
          variant="striped"
          colorScheme="teal"
        >
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
      <Center>
        {totalPage > 1 && (
          <Flex m={4} alignItems="center">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              colorScheme="teal"
              mr={2}
            >
              Previous
            </Button>
            {Array.from({ length: totalPage }, (_, index) => (
              <Button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                colorScheme={currentPage === index + 1 ? "teal" : "gray"}
                mr={2}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
              colorScheme="teal"
              ml={2}
            >
              Next
            </Button>
          </Flex>
        )}
      </Center>
    </>
  );
};