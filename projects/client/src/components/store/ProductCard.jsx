import { Box, Flex, Button, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Image } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useState } from 'react';

const ProductCard = ({ product, cartItems, onUpdateCartItems, setRefreshCart }) => {
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const cartId = localStorage.getItem("cartId");

  const handleUpdateCart = async () => {
    try {
      const response = await axios.put('http://localhost:8000/cashier/cart/item', {
        cartId: cartId,
        productId: product.id,
        quantity: quantity
      },{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      console.log(response)
      onUpdateCartItems();
      setRefreshCart(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete('http://localhost:8000/cashier/cart/item', {
        data: {
          cartId: cartId,
          productId: product.id
        }
      });

      onUpdateCartItems();
      setRefreshCart(true);
    } catch (error) {
      console.error("Error deleting item:", error);
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
