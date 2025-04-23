"use client";

import { ChevronLeft, ShoppingCart } from "lucide-react";
import "./header.scss";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart";
import Image from "next/image";
import cn from "classnames";
import { formatAsDollar } from "@/util/misc";
import bicycle from "@/assets/bicycle.svg";
import { placeOrder } from "@/backend/store";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/contexts/global";
const block = "header";

export default function Header() {
  const cartContext = useContext(CartContext);
  const globalContext = useContext(GlobalContext);
  const router = useRouter();

  const handleClearCart = () => {
    cartContext.updateItems([]);
    cartContext.setIsOpen(false);
  };

  const handleCheckout = async () => {
    globalContext.setWorkingText("Placing order");
    const placeOrderResult = await placeOrder(cartContext);

    if (placeOrderResult) {
      cartContext.updateItems([]);
      cartContext.setIsOpen(false);
      globalContext.setWorkingText("");
      globalContext.setModalText(
        "Order placed successfully! We'll get back to you soon."
      );

      router.push("/");
    }
  };

  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        <div className={`${block}__logo`}>
          Bike
          <span className={`${block}__logo-span`}>torial</span>
        </div>
        <div
          className={cn(`${block}__cart`, {
            [`${block}__cart--active`]: cartContext.items.length > 0,
          })}
          onClick={cartContext.toggleCartDrawer}
        >
          <ShoppingCart
            className={cn(`${block}__cart-icon`, {
              [`${block}__cart-icon--active`]: cartContext.items.length > 0,
            })}
            width={20}
            height={20}
            strokeWidth={3}
          />
          {cartContext.items.length !== 0 && (
            <div className={`${block}__cart-count`}>
              <div className={`${block}__cart-count-number`}>
                {cartContext.items.length}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(`${block}__cart-drawer`, {
          [`${block}__cart-drawer--active`]: cartContext.isOpen,
        })}
      >
        <div
          className={`${block}__cart-drawer-back`}
          onClick={cartContext.toggleCartDrawer}
        >
          <ChevronLeft width={18} height={18} strokeWidth={3} />
          Continue shopping
        </div>
        <div className={`${block}__cart-drawer-container`}>
          {cartContext.items.length === 0 ? (
            <div className={`${block}__cart-drawer-empty`}>
              Your cart is empty
            </div>
          ) : (
            <div className={`${block}__cart-drawer-items`}>
              {cartContext.items.map((item, index) => (
                <div
                  key={index}
                  className={`${block}__cart-drawer-item-container`}
                >
                  <div className={`${block}__cart-drawer-item`}>
                    <div className={`${block}__cart-drawer-item-title`}>
                      {item.label || `Unnamed Build`}
                    </div>
                    <div className={`${block}__cart-drawer-item-price`}>
                      ${item.price}
                    </div>
                  </div>
                  <div className={`${block}__cart-drawer-item-parts`}>
                    {item.parts &&
                      item.parts.map((part: any, index: number) => (
                        <div
                          className={`${block}__cart-drawer-item-part`}
                          key={index}
                        >
                          <div
                            className={`${block}__cart-drawer-item-part-label`}
                          >
                            {part.label}&nbsp;
                            <span className="lowercase">
                              {part.category_label}
                            </span>
                          </div>
                          <div
                            className={`${block}__cart-drawer-item-part-price`}
                          >
                            $
                            {formatAsDollar(
                              part.customPrice || part.price || 0
                            )}
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
                <div className={`${block}__cart-drawer-total-label`}>Total</div>
                <div className={`${block}__cart-drawer-total-price`}>
                  ${formatAsDollar(cartContext.totalPrice)}
                </div>
              </div>

              <div className={`${block}__cart-drawer-actions`}>
                <button
                  className={`${block}__cart-drawer-checkout-button`}
                  onClick={handleCheckout}
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
  );
}
