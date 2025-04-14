"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { PurchaseItem } from "@/types";
import cn from "classnames";
import {
  allFeaturesComplete,
  calculatePricesAndDisabledStates,
  handlePartSelection,
} from "@/util/misc";
import "./part-configurator.scss";
import { CartContext } from "@/contexts/cart";
type ClientInteractionsProps = {
  categories?: any;
  part?: any;
};

const block = "part-configurator";
export function ClientInteractions({
  categories,
  part,
}: ClientInteractionsProps) {
  const cartContext = useContext(CartContext);
  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem>({
    fullfilled: false,
    price: 0,
  });
  const [categoriesState, setCategoriesState] = useState<any>(categories);
  const [shouldCalculatePrices, setShouldCalculatePrices] = useState(false);

  useEffect(() => {
    setCategoriesState(categories);
  }, [categories]);

  const handlePartClick = useCallback(
    (part: any, category: any) => {
      const updatedCategories = handlePartSelection(
        part,
        category,
        categoriesState
      );

      setCategoriesState(updatedCategories);
      setPurchaseItem({
        ...purchaseItem,
        categories: updatedCategories,
        fullfilled: allFeaturesComplete(updatedCategories),
      });
      setShouldCalculatePrices(true);
    },
    [purchaseItem, categoriesState]
  );

  useEffect(() => {
    if (!shouldCalculatePrices) return;

    const { updatedItems, totalPrice, isFullfilled } =
      calculatePricesAndDisabledStates(categoriesState);

    setCategoriesState(updatedItems);
    setPurchaseItem({
      ...purchaseItem,
      price: totalPrice,
      fullfilled: isFullfilled,
      item: part,
    });

    setShouldCalculatePrices(false);
  }, [shouldCalculatePrices, categoriesState, purchaseItem, part]);

  const handleAddToCart = useCallback(() => {
    cartContext.updateItems([purchaseItem]);
  }, [purchaseItem, cartContext]);

  return (
    <div className={block}>
      Price: {purchaseItem.price}
      {categoriesState?.map((category: any) => (
        <div className={`${block}__toolbar-feature`} key={category.id}>
          <div className={`${block}__toolbar-feature-category`}>
            <div className={`${block}__toolbar-feature-category-label`}>
              {category.label}
            </div>
            {category.parts.map((part: any) => (
              <div
                className={cn(`${block}__toolbar-feature-part`, {
                  [`${block}__toolbar-feature-part--disabled`]: part.disabled,
                  [`${block}__toolbar-feature-part--selected`]: part.selected,
                })}
                key={part.id}
                onClick={() =>
                  !part.disabled && handlePartClick(part, category)
                }
              >
                {part.label}/Price: {part.price}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleAddToCart} disabled={!purchaseItem.fullfilled}>
        Add to cart
      </button>
    </div>
  );
}
