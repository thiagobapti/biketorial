"use client";

import { ChevronLeft, ShoppingCart } from "lucide-react";
import "./modal.scss";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart";
import Image from "next/image";
import cn from "classnames";
import { formatAsDollar } from "@/util/misc";
import bicycle from "@/assets/bicycle.svg";
const block = "modal";

export default function Modal() {
  const cartContext = useContext(CartContext);

  return (
    cartContext.modalText && (
      <div className={block}>
        <div className={`${block}__modal-text`}>{cartContext.modalText}</div>
      </div>
    )
  );
}
