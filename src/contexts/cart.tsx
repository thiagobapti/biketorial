"use client";

import { createContext, useContext, useState, useEffect } from "react";

type CartContextType = {
  items: any[];
  updateItems: (items: any[]) => void;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  updateItems: () => {},
});

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const updateItems = (newItems: any[]) => {
    setItems(newItems);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        updateItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
