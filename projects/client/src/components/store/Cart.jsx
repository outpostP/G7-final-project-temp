import { Box, Text } from '@chakra-ui/react';

const Cart = ({ cartItems }) => {
    console.log('Cart items:', cartItems);
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
            <Text fontSize="xl" mb="4">Cart</Text>
            {cartItems.map(item => (
                <Text key={item.cartId}>{item.Product.productName}: {item.quantity}</Text>
            ))}
        </Box>
    );
};

export default Cart;