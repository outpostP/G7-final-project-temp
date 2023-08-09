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
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const baseUrl = "http://localhost:8000/";
const updateUserPassword = async (values) => {
  try {
    const { data } = await axios.put(`${baseUrl}auth/forgotpass`, values);
    return ["success", data];
  } catch (err) {
    return "error";
  }
};

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

export const ResetPasswordModal = ({ isOpen, onClose }) => {
  const toast = useToast();

  const handleLoginToast = (props, content) => {
    toast({
      description: content,
      status: props,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  function inputType() {
    return {
      email: formik.values.email,
    };
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetSchema,
    onSubmit: async () => {
      let request = inputType();
      const result = await updateUserPassword(request);
      if (result[0] === "success") {
        handleLoginToast("success", "Please verify from the email");
        onClose();
      } else {
        handleLoginToast("error", "Failed to reset password");
      }
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={"10px"}>
          <ModalHeader color={"blue.500"}>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Input email to reset password"
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
                Verify
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};