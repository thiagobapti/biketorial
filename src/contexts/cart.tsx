"use client";

import { createContext, useContext, useState, useEffect } from "react";

type CartContextType = {
  items: any[];
  updateItems: (items: any[]) => void;
  append: (item: any) => void;
  remove: (item: any) => void;
};

export const CartContext = createContext<CartContextType>({
  items: [],
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
