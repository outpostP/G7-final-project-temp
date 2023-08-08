import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [refreshCart, setRefreshCart] = useState(false);
    
    const fetchCartItems = async () => {
        try {
          const response = await axios.get('http://localhost:8000/admin/cart/item');
          console.log('Fetched cart items:', response.data);
          setCartItems(response.data);
          setRefreshCart(false);
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        if (refreshCart) {
          fetchCartItems();
        }
      }, [refreshCart]);
  
    const clearCart = () => {
      setCartItems([]);
    };
  
    return (
        <CartContext.Provider value={{ cartItems, clearCart, fetchCartItems, setCartItems }}>
    {children}
  </CartContext.Provider>
    );
  };

export const useCart = () => useContext(CartContext);
