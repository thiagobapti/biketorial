"use client";

import { createContext, useContext, useState, useEffect } from "react";

type CartContextType = {
  items: any[];
  totalPrice: number;
  updateItems: (items: any[]) => void;
  append: (item: any) => void;
  remove: (item: any) => void;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  totalPrice: 0,
  updateItems: () => {},
  append: () => {},
  remove: () => {},
});

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setItems(parsedItems);
      calculateTotalPrice(parsedItems);
    }
  }, []);

  useEffect(() => {
    calculateTotalPrice(items);
  }, [items]);

  const calculateTotalPrice = (cartItems: any[]) => {
    let total = 0;
    for (const item of cartItems) {
      total += item.customPrice || item.price || 0;
    }
    setTotalPrice(total);
  };

  const updateItems = (newItems: any[]) => {
    setItems(newItems);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };

  const append = (item: any) => {
    const newItems = [...items, item];
    updateItems(newItems);
  };

  const remove = (item: any) => {
    const newItems = items.filter((i) => i !== item);
    updateItems(newItems);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        updateItems,
        append,
        remove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
