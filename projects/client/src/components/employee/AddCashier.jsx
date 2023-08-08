import React, { useState } from "react";
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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllCashier } from "../../services/reducer/employeeReducer";

const baseUrl = "http://localhost:8000/";
const registerNewCashier = async (request) => {
  const token = localStorage.getItem("token");
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

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must have at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters")
    .matches(/[0-9]/, "Password must have min 1 number")
    .matches(/[A-Z]/, "Password must have min 1 capital character")
    .matches(/[!@#$%^&*)(+=.,_-]/, "Password must have min 1 symbol"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Confirm Password is not match"),
});

export const AddCashierModal = ({ isOpen, onClose }) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const page = useSelector((state) => state.dataEmployee.currentPage);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleRegisterToast = (props, content) => {
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
      username: formik.values.username,
      email: formik.values.email,
      password: formik.values.password,
      confirmPassword: formik.values.confirmPassword,
    };
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      let request = inputType();
      const result = await registerNewCashier(request);
      if (result[0] === "success") {
        handleRegisterToast("success", "Successfully add new cashier");
        dispatch(getAllCashier(page));
        onClose();
      } else {
        handleRegisterToast("error", "Failed add new cashier");
      }
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={"10px"}>
          <ModalHeader color={"blue.500"}>Register New Cashier</ModalHeader>
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
              <FormControl
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    variant="filled"
                    placeholder="Input your password"
                    type={showPassword1 ? "text" : "password"}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword1((showPassword) => !showPassword)
                      }
                    >
                      {showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    id="confirmPassword"
                    variant="filled"
                    placeholder="Input your password"
                    type={showPassword2 ? "text" : "password"}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword2((showPassword) => !showPassword)
                      }
                    >
                      {showPassword2 ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <FormErrorMessage>
                      {formik.errors.confirmPassword}
                    </FormErrorMessage>
                  )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
