import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();
  
  const [paymentAccount, setPaymentAccount] = useState("");
  const [changeAmount, setChangeAmount] = useState(0);
  
  const totalPrice = cartItems.reduce((total, item) => total + item.Product.productPrice * item.quantity, 0);
  
  const handlePaymentAccountChange = (event) => {
    setPaymentAccount(event.target.value);
    
    const paymentAmount = parseFloat(event.target.value);
    const totalAmount = totalPrice;
    
    const change = paymentAmount - totalAmount;
    setChangeAmount(change);
  };

  const handleSendCart = async () => {
    console.log(cartItems);
    try {
      const response = await axios.post('http://localhost:8000/admin/transaction', { cartItems });
      // console.log('Cart sent successfully:', response.data.data);
      const cartId = cartItems[0].cartId;
      // console.log(cartId) // Assuming the `cartId` property represents the `id` value for the `DELETE` request
      const response1 = await axios.delete(`http://localhost:8000/admin/cart/${cartId}`);
      // console.log(response1) // Assuming the `cartId` property represents the `id` value for the `DELETE` request
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
        placeholder={0}
        value={paymentAccount ? 0 : paymentAccount}
        onChange={handlePaymentAccountChange}
      />
      <Text mt="4">Change Amount: {changeAmount}</Text>
      <Button mt="4" colorScheme="blue" onClick={handleSendCart}>
        Send Cart
      </Button>
    </Box>
  );
};

export default Cart;
