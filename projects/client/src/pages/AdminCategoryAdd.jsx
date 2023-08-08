import React, { useState } from 'react';
import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCategoryForm = () => {
  const [category, setCategory] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (category === '') {
      toast({
        title: 'Please input the category',
        status: 'warning',
        variant: 'subtle',
        isClosable: true,
      });
    } else {
      try {
        const response = await axios.post('http://localhost:8000/admin/cate/', {
          category: category,
        });
        if (response.status === 200) {
          toast({
            title: 'Submission succeeded',
            status: 'success',
            variant: 'subtle',
            isClosable: true,
          });
          navigate('admin/category');
        } else {
          toast({
            title: 'Submission failed',
            status: 'error',
            variant: 'subtle',
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'An error occurred',
          description: error.message,
          status: 'error',
          variant: 'subtle',
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="400px"
      margin="0 auto"
      padding="2rem"
      borderRadius="md"
      boxShadow="md"
      backgroundColor="white"
      sx={{
        '@media (min-width: 768px)': {
          maxWidth: '600px',
          padding: '4rem',
        },
      }}
    >
      <Input
        placeholder="Add categories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        marginBottom="1rem"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default AddCategoryForm;
