import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();  // add this line to use Chakra UI Toast

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/admin/login', { username, password });
      if (response) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        if (!response.data.isAdmin) {
          localStorage.setItem('cartId', response.data.cartId);
        }
        localStorage.setItem('isAdmin', response.data.isAdmin);

        toast({
          title: "Login successful!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

      } else {
        toast({
          title: 'Login failed. Please check your username and password.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Logout successful!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <button type="submit" style={buttonStyle}>Log In</button>
      <button type="button" onClick={handleLogout} style={buttonStyle}>Log Out</button>
    </form>
  );
}

export default LoginForm;
