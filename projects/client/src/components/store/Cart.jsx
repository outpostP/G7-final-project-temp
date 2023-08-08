import { Box, Text, Button } from "@chakra-ui/react";
import axios from "axios";

const Cart = ({ cartItems }) => {
  console.log("Cart items:", cartItems);

  const handleSendCart = async () => {
    try {
      // Send cartItems to the server using POST request
      const response = await axios.post(
        "http://localhost:8000/admin/transaction",
        { cartItems }
      );
      console.log("Cart sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending cart:", error);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
      <Text fontSize="xl" mb="4">
        Cart
      </Text>
      {cartItems.map((item) => (
        <Text key={item.cartId}>
          {item.Product.productName}: {item.quantity}
        </Text>
      ))}
      <Button mt="4" colorScheme="blue" onClick={handleSendCart}>
        Send Cart
      </Button>
    </Box>
  );
};

export default Cart;
