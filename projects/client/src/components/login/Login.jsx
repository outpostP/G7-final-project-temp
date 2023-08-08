import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ResetPasswordModal } from "./ForgotPassword";

const baseUrl = "http://localhost:8000/";
let dataUser;

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const fetchUser = async (values) => {
  try {
    const { data } = await axios.post(`${baseUrl}auth/login`, values);
    const token = data.data.token;
    dataUser = data.data;
    if (token && dataUser.isAdmin) {
      localStorage.setItem("userId", dataUser.id);
      localStorage.setItem("isAdmin", dataUser.isAdmin);
      localStorage.setItem("token", token);
    } else if (token && !dataUser.isAdmin) {
      localStorage.setItem("userId", dataUser.id);
      localStorage.setItem("cartId", dataUser.cartId);
      localStorage.setItem("isAdmin", dataUser.isAdmin);
      localStorage.setItem("token", token);
    }
    return ["success", dataUser];
  } catch (err) {
    return "error";
  }
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [isResetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);

  const openResetPasswordModal = () => {
    setResetPasswordModalOpen(true);
  };

  const closeResetPasswordModal = () => {
    setResetPasswordModalOpen(false);
  };

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
      username: formik.values.username,
      password: formik.values.password,
    };
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      let request = inputType();
      const userLogin = await fetchUser(request);
      if (userLogin[0] === "success") {
        handleLoginToast("success", "Successfully logged in");
        dataUser.isAdmin ? navigate("admin") : navigate("user");
      } else {
        handleLoginToast("error", "Failed to logged in");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        backgroundImage="/image/backgroundlogin.jpg"
        minHeight="100vh"
        backgroundSize="cover"
      >
        <Flex justify="center" align="center" minHeight="100vh">
          <Box
            margin={{ base: "20px", md: "50px" }}
            borderWidth="1px"
            borderRadius="lg"
            p={{ base: "10px", md: "50px" }}
            boxShadow="lg"
            bg="white"
            maxW="100%"
          >
            <Stack direction={{ base: "column", md: "row" }}>
              <Flex
                flex={1}
                p={{ base: "0", md: "30px" }}
                justify="center"
                align="center"
              >
                <Image
                  alt="Login Image"
                  objectFit="cover"
                  src="/image/login.jpg"
                  maxBlockSize="md"
                />
              </Flex>
              <Flex
                p={{ base: "20px", md: "30px" }}
                flex={1}
                align="center"
                justify="center"
              >
                <Stack
                  spacing={4}
                  w="full"
                  maxW="lg"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="lg"
                  p={10}
                >
                  <Heading fontSize="2xl">Welcome</Heading>
                  <Heading color="blue.500" fontSize="md">
                    Sign in to your account
                  </Heading>
                  <FormControl
                    isInvalid={
                      formik.touched.username && formik.errors.username
                    }
                  >
                    <FormLabel>Username</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Input your username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <FormErrorMessage>
                        {formik.errors.username}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        variant="filled"
                        placeholder="Input your password"
                        type={showPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <InputRightElement h="full">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                      <FormErrorMessage>
                        {formik.errors.password}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Stack spacing={6}>
                    <Button
                      onClick={openResetPasswordModal}
                      variant="link"
                      color="blue.500"
                    >
                      Forgot Password?
                    </Button>
                    <ResetPasswordModal
                      isOpen={isResetPasswordModalOpen}
                      onClose={closeResetPasswordModal}
                    />
                    <Button type="submit" colorScheme="blue" variant="solid">
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </form>
  );
};
