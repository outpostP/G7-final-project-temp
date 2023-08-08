import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
  Button,
  //   useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { getAllCashier } from "../../services/reducer/employeeReducer";

const baseUrl = "http://localhost:8000/";
const token = localStorage.getItem("token");
const updateCashier = async (request) => {
  try {
    const { data } = await axios.post(`${baseUrl}auth/user`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return ["success", data];
  } catch (err) {
    console.log(err.message);
    return "error";
  }
};

const UpdateSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must have at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

export const UpdateCashierModal = ({ isOpen, onClose }) => {
  //   const toast = useToast();
  //   const dispatch = useDispatch();

  //   const handleRegisterToast = (props, content) => {
  //     toast({
  //       description: content,
  //       status: props,
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //   };

  function inputType() {
    return {
      username: formik.values.username,
      email: formik.values.email,
    };
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: UpdateSchema,
    onSubmit: async () => {
      let request = inputType();
      const result = await updateCashier(request);
      console.log(result);
      //   if (result[0] === "success") {
      //     handleRegisterToast("success", "Successfully update cashier");
      //     dispatch(getAllCashier());
      //     onClose();
      //   } else {
      //     handleRegisterToast("error", "Failed update cashier");
      //   }
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={"10px"}>
          <ModalHeader color={"blue.500"}>Edit Cashier</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl
                isInvalid={formik.touched.username && formik.errors.username}
              >
                <FormLabel>Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Input cashier username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Input cashier email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
