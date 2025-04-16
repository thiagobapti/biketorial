"use client";

import { ShoppingCart } from "lucide-react";
import "./header.scss";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart";
import Image from "next/image";
import cn from "classnames";
const block = "header";

export default function Header() {
  const cartContext = useContext(CartContext);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const handleClearCart = () => {
    cartContext.updateItems([]);
  };

  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        <div className={`${block}__logo`}>Biketorial.</div>
        <div
          className={cn(`${block}__cart`, {
            [`${block}__cart--active`]: cartContext.items.length > 0,
          })}
          onClick={() => setIsCartDrawerOpen(!isCartDrawerOpen)}
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
      <div
        className={cn(`${block}__cart-drawer`, {
          [`${block}__cart-drawer--active`]: isCartDrawerOpen,
        })}
      >
        <div className={`${block}__cart-drawer-header`}>
          <div
            className={`${block}__cart-drawer-header-title`}
            onClick={() => setIsCartDrawerOpen(!isCartDrawerOpen)}
          >
            Cart
          </div>
          <div>
            {cartContext.items.length === 0 ? (
              <div className={`${block}__cart-drawer-empty`}>
                Your cart is empty
              </div>
            ) : (
              <div className={`${block}__cart-drawer-items`}>
                {cartContext.items.map((item, index) => (
                  <div key={index}>
                    <div className={`${block}__cart-drawer-item`}>
                      <div className={`${block}__cart-drawer-item-title`}>
                        {item.item?.label || `Unnamed Build`}
                      </div>
                      <div className={`${block}__cart-drawer-item-price`}>
                        ${item.price}
                      </div>
                    </div>
                    <div>
                      {item.parts &&
                        item.parts.map((part: any, index: number) => (
                          <div key={index}>
                            {/* <Image
                              src={`/parts/${part.id || part.id_part}.png`}
                              alt={part.label}
                              width={120}
                              height={80}
                              style={{
                                borderRadius: "10px",
                              }}
                            /> */}
                            <div>
                              {part.category_label} - {part.label}
                            </div>
                          </div>
                        ))}
                    </div>
                    <button
                      onClick={() => cartContext.remove(item)}
                      className={`${block}__cart-drawer-item-remove`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className={`${block}__cart-drawer-total`}>
                  <div className={`${block}__cart-drawer-total-title`}>
                    Total
                  </div>
                  <div className={`${block}__cart-drawer-total-price`}>
                    $
                    {cartContext.items.reduce(
                      (acc, item) => acc + (item.price || 0),
                      0
                    )}
                  </div>
                </div>
                <div className={`${block}__cart-drawer-actions`}>
                  <button
                    className={`${block}__cart-drawer-checkout-button`}
                    onClick={() => alert("Proceeding to checkout...")}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className={`${block}__cart-drawer-clear-button`}
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
