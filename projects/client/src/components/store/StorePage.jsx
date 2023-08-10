/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import axios from 'axios';
import ProductList from './ProductList';
import Cart from './Cart';

const StorePage = () => {
 
  const [cartItems, setCartItems] = useState([]);
  const [refreshCart, setRefreshCart] = useState(false);
  const token = localStorage.getItem("token");
  

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/cashier/cart/item',{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
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
  
  useEffect(() => {
    if (refreshCart) {
      fetchCartItems();
    }
  }, [refreshCart]);

  
  
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
    <GridItem colSpan={3}>
      <ProductList setCartItems={setCartItems} setRefreshCart={setRefreshCart} />
    </GridItem>
    <GridItem colSpan={2}>
    <Box overflow="auto" maxHeight="500px"> 
      <Cart cartItems={cartItems} />
    </Box>
    </GridItem>
  </Grid>
  );
};

export default StorePage;
