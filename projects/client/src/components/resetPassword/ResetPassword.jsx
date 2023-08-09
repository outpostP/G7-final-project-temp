import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
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

const baseUrl = "http://localhost:8000/";

const PasswordSchema = Yup.object().shape({
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

const resetPassword = async (request, token) => {
  try {
    const { data } = await axios.patch(`${baseUrl}auth/resetpass`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return ["success", data];
  } catch (err) {
    return "error";
  }
};

export const ResetPassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const fullUrl = window.location.href.split("/");
  const token = fullUrl[fullUrl.length - 1];

  const toast = useToast();
  const navigate = useNavigate();

  const handleResetToast = (props, content) => {
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
      password: formik.values.password,
      confirmPassword: formik.values.confirmPassword,
    };
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: async () => {
      let request = inputType();
      const result = await resetPassword(request, token);
      if (result[0] === "success") {
        handleResetToast("success", "Successfully reset password");
        navigate("/");
      } else {
        handleResetToast("error", "Failed to reset password");
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
            margin="80px"
            borderWidth="1px"
            borderRadius="lg"
            p={"80px"}
            boxShadow="lg"
            bg="white"
          >
            <Stack direction={{ base: "column", md: "row" }}>
              <Flex p={"30px"} flex={1} align="center" justify="center">
                <Stack
                  spacing={4}
                  w="full"
                  maxW="lg"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow={"lg"}
                  p={10}
                >
                  <Heading color={"blue.500"} fontSize="lg">
                    Reset Your Password
                  </Heading>
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
                      <FormErrorMessage>
                        {formik.errors.password}
                      </FormErrorMessage>
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
                  <Stack pt={5}>
                    <Button type="submit" colorScheme="blue" variant="solid">
                      Reset Password
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
