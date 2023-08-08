import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartList = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCartsWithTotalProductQuantity();
  }, []);

  async function fetchCartsWithTotalProductQuantity() {
    try {
      const response = await axios.get('/api/carts'); // Replace '/api/carts' with the actual API endpoint URL
      console.log(`response: ${response}`)
      setCarts(response);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  }

  return (
    <div>
      <h1>Cart List</h1>
      <ul>
        {carts.map((cart) => (
          <li key={cart.id}>
            <p>Total Price: {cart.totalPrice}</p>
            <p>Total Items: {cart.totalItem}</p>
            <p>Total Product Quantity: {cart.totalProductQuantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartList;
