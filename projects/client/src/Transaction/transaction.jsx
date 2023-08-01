import React, { useState } from 'react';
import { Box, Text, Input, Button, List,  Stack } from '@chakra-ui/react';

const TransactionBar = ({ selectedItems, totalAmount, onUpdateQuantity, onCheckout }) => {
  const [customerPayment, setCustomerPayment] = useState('');

  const handlePaymentChange = (event) => {
    setCustomerPayment(event.target.value);
  };

  const calculateChange = () => {
    const payment = parseFloat(customerPayment);
    return !isNaN(payment) ? payment - totalAmount : 0;
  };

  return (
    <Box>
      <List>
        {/* ... */}
      </List>
      <Stack direction="row" align="center" mt={4}>
        <Text>Total Amount:</Text>
        <Text fontWeight="bold">{totalAmount}</Text>
      </Stack>
      <Stack direction="row" align="center" mt={2}>
        <Text>Customer Payment:</Text>
        <Input type="number" value={customerPayment} onChange={handlePaymentChange} />
      </Stack>
      <Stack direction="row" align="center" mt={2}>
        <Text>Change:</Text>
        <Text fontWeight="bold">{calculateChange()}</Text>
      </Stack>
      <Button mt={4} colorScheme="blue" onClick={onCheckout}>
        Checkout
      </Button>
    </Box>
  );
};

export default TransactionBar;
