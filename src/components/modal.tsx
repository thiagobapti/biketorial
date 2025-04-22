"use client";

import { ChevronLeft, ShoppingCart } from "lucide-react";
import "./modal.scss";
import { useContext, useState } from "react";
import { GlobalContext } from "@/contexts/global";
import Image from "next/image";
import cn from "classnames";
import { formatAsDollar } from "@/util/misc";
import bicycle from "@/assets/bicycle.svg";
const block = "modal";

export default function Modal() {
  const globalContext = useContext(GlobalContext);
  return (
    (globalContext.modalText || globalContext.workingText) && (
      <div className={block}>
        {globalContext.workingText && (
          <div className={`${block}__working`}>{globalContext.workingText}</div>
        )}
        {globalContext.modalText && (
          <div className={`${block}__modal`}>
            {globalContext.modalText}
            <button onClick={() => globalContext.setModalText("")}>
              Close
            </button>
          </div>
        )}
      </div>
    )
  );
}
