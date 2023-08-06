import { useState } from 'react';
import axios from 'axios';
import { SimpleGrid } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductList = ({ products, setCartItems, setRefreshCart }) => {
  const handleCartUpdate = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/cart/item');
      const updatedCartItems = response.data;
      setCartItems(updatedCartItems);
      setRefreshCart(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SimpleGrid columns={3} spacing={10}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onUpdateCartItems={handleCartUpdate}
          setCartItems={setCartItems} // Pass the setCartItems function as a prop
        />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
