import React, { useState, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import ProductList from './ProductList';
import Cart from './Cart';

const StorePage = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
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
                const response = await axios.get('/api/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
        fetchCartItems();
    }, []);

    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <GridItem colSpan={3}>
                <ProductList products={products} />
            </GridItem>
            <GridItem colSpan={2}>
                <Cart cartItems={cartItems} />
            </GridItem>
        </Grid>
    );
};

export default StorePage;