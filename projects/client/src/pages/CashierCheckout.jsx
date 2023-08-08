import { useState, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';

const CheckOut = () => {
const [cartItems, setCartItems] = useState([]);
const [cart, setCart] = useState()

const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:8000/admin/cart/item');
    setCartItems(response.data);
    console.log(cartItems)
  } catch (error) {
    console.error(error);
  }
};

const handleCancel = async (id) => {
    try {
        await axios
    } catch (error) {
        
    }
}

console.log(cartItems)

useEffect(() => {
  fetchCartItems();
}, [])


    return (
        <>
        </>
    )
}

export default CheckOut