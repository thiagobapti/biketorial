"use client";

import { ShoppingCart } from "lucide-react";
import "./header.scss";
import { useContext } from "react";
import { CartContext } from "@/contexts/cart";
import cn from "classnames";
const block = "header";

export default function Header() {
  const cartContext = useContext(CartContext);
  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        <div className={`${block}__logo`}>Biketorial.</div>
        <div
          className={cn(`${block}__cart`, {
            [`${block}__cart--active`]: cartContext.items.length > 0,
          })}
        >
          <ShoppingCart width={20} height={20} strokeWidth={3} />
          {cartContext.items.length !== 0 && (
            <div className={`${block}__cart-count`}>
              Checkout
              <div className={`${block}__cart-count-number`}>
                {cartContext.items.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
