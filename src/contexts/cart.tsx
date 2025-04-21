"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CartContext as CartContextType } from "@/types";

export const CartContext = createContext<CartContextType>({
  items: [],
  totalPrice: 0,
  modalText: "",
  updateItems: () => {},
  append: () => {},
  remove: () => {},
  isOpen: false,
  setIsOpen: () => {},
  toggleCartDrawer: () => {},
  setModalText: () => {},
});

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalText, _setModalText] = useState<string>("");
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

  const toggleCartDrawer = () => {
    setIsOpen(!isOpen);
  };

  const setModalText = (text: string) => {
    _setModalText(text);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        modalText,
        updateItems,
        append,
        remove,
        isOpen,
        setIsOpen,
        toggleCartDrawer,
        setModalText,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
