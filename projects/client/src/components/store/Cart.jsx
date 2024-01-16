import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [paymentAccount, setPaymentAccount] = useState("");
  const [changeAmount, setChangeAmount] = useState(0);
  
  const totalPrice = cartItems.reduce((total, item) => total + item.Product.productPrice * item.quantity, 0);
  
  const handlePaymentAccountChange = (event) => {
    const input = event.target.value;
    const paymentAmount = parseFloat(input);
  
    if (!isNaN(paymentAmount) || input === "") {
      setPaymentAccount(input);
      const totalAmount = totalPrice; 
      const change = isNaN(paymentAmount) ? 0 : paymentAmount - totalAmount;
      setChangeAmount(change);
    } else {
      console.error("Invalid input. Please enter a valid number.");
    }
  };
  

  const handleSendCart = async () => {
    try {
      const response = await axios.post('http://localhost:8000/cashier/transaction', { cartItems }, { 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      const cartId = cartItems[0].cartId;
      const response1 = await axios.delete(`http://localhost:8000/cashier/cart/${cartId}`,{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      navigate(`/user/checkout/${response.data.data}`)
    } catch (error) {
      console.error('Error sending cart:', error);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
      <Text fontSize="xl" mb="4">Cart</Text>
      <Box maxHeight="400px" overflowY="auto">
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead style={{ position: 'sticky', top: 0, background: 'white' }}>
            <Tr>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartItems.map(item => (
              <Tr key={item.cartId}>
                <Td>{item.Product.productName}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.Product.productPrice * item.quantity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Text mt="4">Total Price: {totalPrice}</Text>
      <Input
  mt="4"
  placeholder="0"
  value={paymentAccount}
  onChange={handlePaymentAccountChange}
/>
<Text mt="4">Change Amount: {isNaN(changeAmount) ? 0 : changeAmount}</Text>
      <Button mt="4" colorScheme="blue" onClick={handleSendCart}>
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;
