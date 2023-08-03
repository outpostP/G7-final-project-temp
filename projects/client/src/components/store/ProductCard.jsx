import { useState } from 'react';
import { Box, Button, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import axios from 'axios';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (value) => {
        setQuantity(value);
    };

    const cartid = localStorage.getItem("cartId");

    const handleUpdateCart = async () => {
        try {
            const response = await axios.put('/cart/item', {
                cartId: cartid, // Replace with your cart ID
                productId: product.id,
                quantity: quantity
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
            <Text fontSize="xl" mb="4">{product.productName}</Text>
            <Text mb="4">${product.productPrice}</Text>
            <NumberInput min={0} value={quantity} onChange={handleQuantityChange} mb="4">
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Button colorScheme="teal" onClick={handleUpdateCart}>Update Cart</Button>
        </Box>
    );
};

export default ProductCard;