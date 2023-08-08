import { Box, Text, Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

const Cart = ({ cartItems }) => {
  console.log('Cart items:', cartItems);

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
    console.log('Payment Account:', paymentAccount);

    try {
      const response = await axios.post('http://localhost:8000/admin/transaction', { cartItems, paymentAccount });
      console.log('Cart sent successfully:', response.data);
      const response1 = await axios.delete(`http://localhost:8000/admin/cart/${cartItems.id}`)
    } catch (error) {
      console.error('Error sending cart:', error);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
      <Text fontSize="xl" mb="4">Cart</Text>
      {cartItems.map(item => (
        <Text key={item.cartId}>{item.Product.productName}: {item.quantity}</Text>
      ))}
      <Text mt="4">Total Price: {totalPrice}</Text>
      <Input
        mt="4"
        placeholder="Payment Account"
        value={paymentAccount}
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
