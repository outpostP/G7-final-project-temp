"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";

export const Login = () => {
  return (
    <form>
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
              <Flex flex={1} p={"30px"}>
                <Image
                  alt="Login Image"
                  objectFit="cover"
                  src="/image/login.jpg"
                  maxBlockSize="md"
                />
              </Flex>
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
                  <Heading fontSize="2xl">Welcome</Heading>
                  <Heading color={"blue.500"} fontSize="md">
                    Sign in to your account
                  </Heading>
                  <FormControl id="email">
                    <FormLabel>Username</FormLabel>
                    <Input type="text" placeholder="Input your username" />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Input your password" />
                  </FormControl>
                  <Stack spacing={6}>
                    <Button variant={"link"} color={"blue.500"}>
                      Forgot Password?
                    </Button>
                    <Button colorScheme="blue" variant="solid">
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
