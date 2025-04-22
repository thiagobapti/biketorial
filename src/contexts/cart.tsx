"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CartContext as CartContextType } from "@/types";

export const CartContext = createContext<CartContextType>({
  items: [],
  totalPrice: 0,
  updateItems: () => {},
  append: () => {},
  remove: () => {},
  isOpen: false,
  setIsOpen: () => {},
  toggleCartDrawer: () => {},
});

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedItems = localStorage.getItem("cart-items");

    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setItems(parsedItems);
      calculateTotalPrice(parsedItems);
    }
  }, []);

  const updateItems = (newItems: any[]) => {
    setItems(newItems);
    localStorage.setItem("cart-items", JSON.stringify(newItems));
  };

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

  const append = (item: any) => {
    const newItems = [...items, item];

    updateItems(newItems);
  };

  const remove = (item: any) => {
    const newItems = items.filter((i) => i !== item);

    updateItems(newItems);
  };

  const toggleCartDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        updateItems,
        append,
        remove,
        isOpen,
        setIsOpen,
        toggleCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
