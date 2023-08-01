import { useState } from 'react';
import { Box, Container, Button, Link as ChakraLink, Flex } from '@chakra-ui/react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here (e.g., call an API for authentication)
    console.log('Login with email:', email, 'and password:', password);
  };

  return (
    <Container maxW="sm" mt={8}>
      <Box boxShadow="lg" p={8} rounded="md">
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
        <Flex mt={4} justify="space-between">
          <ChakraLink color="blue.500" href="#">
            Forgot Password?
          </ChakraLink>
          <ChakraLink color="blue.500" href="#">
            Create an account
          </ChakraLink>
        </Flex>
      </Box>
    </Container>
  );
}

export default Login;