import { useState, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';

const CheckOut = () => {
const [cartItems, setCartItems] = useState([]);
const [refreshCart, setRefreshCart] = useState(false);

const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:8000/admin/cart/item');
    setCartItems(response.data);
    console.log(cartItems)
    setRefreshCart(false); 
  } catch (error) {
    console.error(error);
  }
};
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