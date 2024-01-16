import { Box, Flex, Button, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Image, useToast  } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useState } from 'react';

const ProductCard = ({ product, cartItems, onUpdateCartItems, setRefreshCart }) => {
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const toast = useToast();

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };


  const handleUpdateCart = async () => {
    try {
      const response = await axios.put('http://localhost:8000/cashier/cart/item', {
   
        productId: product.id,
        quantity: quantity
      },{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      console.log(response)
      onUpdateCartItems();
      // setRefreshCart(true);
      toast({
        title: "Cart updated",
        description: "Product quantity updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      let errorMessage = "An error occurred while updating the cart.";

      if (error.response && error.response.status === 404) {
        errorMessage = "Product not found.";
      } else if (error.response && error.response.status === 400) {
        errorMessage = "Invalid request. Please check your input.";
      } else if (error.response && error.response.status === 500) {
        errorMessage = "Internal server error. Please try again later.";
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete('http://localhost:8000/cashier/cart/item', {
        data: {
          productId: product.id
        }
      });
      onUpdateCartItems();
      setRefreshCart(true);
      toast({
        title: "Item deleted",
        description: "Product removed from the cart successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      let errorMessage = "An error occurred while deleting the item from the cart.";

      if (error.response && error.response.status === 404) {
        errorMessage = "Item not found.";
      } else if (error.response && error.response.status === 500) {
        errorMessage = "Internal server error. Please try again later.";
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" maxWidth={{ base: '100%', md: '500px' }}>
      <Text fontSize="xl" mb="4">{product.productName}</Text>
      <Text mb="4">${product.productPrice}</Text>
      <Text mb="4">{product.productDescription}</Text>
      <Flex direction="column" alignItems="center" mb="4">
        <Image src={`http://localhost:8000/${product.productImage}`} alt={product.productName} />
        <NumberInput min={0} value={quantity} onChange={handleQuantityChange} mt="4">
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <Flex justify="space-between">
        <Button colorScheme="teal" onClick={handleUpdateCart}>
          <EditIcon />
        </Button>
        <Button colorScheme="red" onClick={handleDeleteItem}>
          <DeleteIcon />
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductCard;
