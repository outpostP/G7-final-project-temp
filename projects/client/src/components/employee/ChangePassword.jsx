import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCashier } from "../../services/reducer/employeeReducer";

const baseUrl = "http://localhost:8000/";
const resetPass = "Abc@123";
const updatePassword = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.patch(
      `${baseUrl}profile/password`,
      {
        cashierId: userId,
        password: resetPass,
        confirmPassword: resetPass,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return ["success", data];
  } catch (err) {
    console.log(err.message);
    return "error";
  }
};

export const ResetPasswordModal = ({ isOpen, onClose, item }) => {
  const page = useSelector((state) => state.dataEmployee.currentPage);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleToast = (props, content) => {
    toast({
      description: content,
      status: props,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleConfirm = async (userId) => {
    const result = await updatePassword(userId);
    if (result[0] === "success") {
      handleToast("success", "Successfully reset password");
      dispatch(getAllCashier(page));
      onClose();
    } else {
      handleToast("error", "Failed reset password");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={"10px"}>
        <ModalHeader color={"blue.500"}>Reset Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to reset {item.username}'s password to
          {` "${resetPass}" `}?
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => handleConfirm(item.id)}
          >
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};