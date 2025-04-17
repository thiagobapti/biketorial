"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Category, Part, PurchaseItem } from "@/types";
import cn from "classnames";
import { handlePartSelectionWithPriceCalculation } from "@/util/misc";
import "./part-configurator.scss";
import { CartContext } from "@/contexts/cart";
import { getGroupedParts } from "@/backend/store";
type PartConfiguratorProps = {
  part: Part;
};

const block = "part-configurator";
export function PartConfigurator({ part }: PartConfiguratorProps) {
  const cartContext = useContext(CartContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem>({
    fulfilled: false,
    price: part.price,
    parts: [part],
    label: part.category_label,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!part?.id) return;

      const groupedParts = await getGroupedParts(part.id_category);

      console.log("categories", groupedParts);

      /////////

      const { updatedItems, totalPrice, isfulfilled, allSelectedParts } =
        handlePartSelectionWithPriceCalculation(
          null,
          null,
          groupedParts as Category[],
          part.id
        );

      setCategories(updatedItems);

      setPurchaseItem((prev) => ({
        ...prev,
        parts: [part, ...allSelectedParts],
        price: Number(part.price) + totalPrice,
        fulfilled: isfulfilled,
      }));

      //fulfilled: (categories as Category[]).length === 0,

      //////
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
          categories as Category[],
          part.id
        );

      setCategories(updatedItems);

      setPurchaseItem((prev) => ({
        ...prev,
        parts: [part, ...allSelectedParts],
        price: Number(part.price) + totalPrice,
        fulfilled: isfulfilled,
      }));
    },
    [part, categories]
  );

  const handleAddToCart = useCallback(() => {
    if (purchaseItem.fulfilled) {
      // if (!purchaseItem.parts) {
      //   purchaseItem.parts = [part as Part];
      //   purchaseItem.label = part?.label;
      // }
      console.log("purchaseItem", purchaseItem);
      cartContext.append(purchaseItem);
    }
  }, [purchaseItem, cartContext]);

  return (
    <div className={block}>
      Price: {purchaseItem.price}
      {categories &&
        categories?.map((category: any) => (
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
                  {part.label}/Price: {part.customPrice || part.price}
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
