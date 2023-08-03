import { useState } from 'react';
import { Box, Button, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Image } from '@chakra-ui/react';
import axios from 'axios';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (value) => {
        setQuantity(value);
    };

    const cartid = localStorage.getItem("cartId");
    console.log(cartid);

    const handleUpdateCart = async () => {
        try {
            const response = await axios.put('http://localhost:8000/admin/cart/item', {
                cartId: cartid,
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
            <Text mb="4">{product.productDescription}</Text>
            <Image src={`http://localhost:8000/${product.productImage}`} alt={product.productName} mb="4" />
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
