import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (i) => i._id === item._id && i.size === item.size
      );

      if (index !== -1) {
        // Item exists → increment quantity by 1
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + 1,
        };
        return updated;
      }

      // Item doesn’t exist → add new with quantity 1 if not set
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const updateQuantity = (_id, size, quantity) => {
    if (quantity < 1) return; // optional: remove if 0
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (_Id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item._id === _Id && item.size === size))
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
