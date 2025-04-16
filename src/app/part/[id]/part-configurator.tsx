"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Category, Part, PurchaseItem } from "@/types";
import cn from "classnames";
import { handlePartSelectionWithPriceCalculation } from "@/util/misc";
import "./part-configurator.scss";
import { CartContext } from "@/contexts/cart";
import { getGroupedParts } from "@/backend/store";
type PartConfiguratorProps = {
  part?: Part;
};

const block = "part-configurator";
export function PartConfigurator({ part }: PartConfiguratorProps) {
  const cartContext = useContext(CartContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem>({
    fulfilled: false,
    price: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!part?.id) return;

      const categories = await getGroupedParts(part.id_category);
      console.log(categories);
      setCategories(categories as Category[]);
      setPurchaseItem((prev) => ({
        ...prev,
        categories: categories as Category[],
      }));
    };
    fetchData();
  }, [part]);

  const handlePartSelection = useCallback(
    (_part: any, category: any) => {
      if (!part) return;

      const { updatedItems, totalPrice, isfulfilled, allSelectedParts } =
        handlePartSelectionWithPriceCalculation(
          _part,
          category,
          purchaseItem.categories as Category[]
        );

      setPurchaseItem({
        ...purchaseItem,
        categories: updatedItems,
        parts: [part, ...allSelectedParts],
        price: totalPrice,
        fulfilled: isfulfilled,
      });
    },
    [purchaseItem, part]
  );

  const handleAddToCart = useCallback(() => {
    cartContext.append(purchaseItem);
  }, [purchaseItem, cartContext]);

  return (
    <div className={block}>
      Price: {purchaseItem.price}
      {purchaseItem.categories &&
        purchaseItem.categories?.map((category: any) => (
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
                    !part.disabled && handlePartSelection(part, category)
                  }
                >
                  {part.label}/Price: {part.price}
                </div>
              ))}
            </div>
          </div>
        ))}
      <button onClick={handleAddToCart} disabled={!purchaseItem.fulfilled}>
        Add to cart
      </button>
    </div>
  );
}
