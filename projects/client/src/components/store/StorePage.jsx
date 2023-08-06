import { useState, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import ProductList from './ProductList';
import Cart from './Cart';

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [refreshCart, setRefreshCart] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/product');
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/cart/item');
      setCartItems(response.data);
      setRefreshCart(false); // Reset refreshCart after fetching
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchCartItems();
  }, [])
  
  useEffect(() => {
    if (refreshCart) {
      fetchCartItems();
    }
  }, [refreshCart]);

  // Separate useEffect for fetching products
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <GridItem colSpan={3}>
        <ProductList products={products} setCartItems={setCartItems} setRefreshCart={setRefreshCart} />
      </GridItem>
      <GridItem colSpan={2}>
        <Cart cartItems={cartItems} />
      </GridItem>
    </Grid>
  );
};

export default StorePage;
