"use client";

import { ShoppingCart } from "lucide-react";
import "./header.scss";
import { useContext } from "react";
import { CartContext } from "@/contexts/cart";
const block = "header";

export default function Header() {
  const cartContext = useContext(CartContext);
  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        <div className={`${block}__logo`}>Biketorial.</div>
        <div className={`${block}__cart`}>
          <ShoppingCart width={20} height={20} />
          <div className={`${block}__cart-count`}>
            {cartContext.items.length}
          </div>
        </div>
      </div>
    </div>
  );
}
