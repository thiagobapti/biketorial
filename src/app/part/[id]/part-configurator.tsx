"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Category, Part, PurchaseItem } from "@/types";
import cn from "classnames";
import {
  formatAsDollar,
  handlePartSelectionWithPriceCalculation,
} from "@/util/misc";
import "./part-configurator.scss";
import { CartContext } from "@/contexts/cart";
import { getGroupedParts } from "@/backend/store";
import CategoryPartSelector from "@/components/category-part-selector";
type PartConfiguratorProps = {
  part: Part;
  className?: string;
};

const block = "part-configurator";
export function PartConfigurator({ part, className }: PartConfiguratorProps) {
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
      cartContext.append(purchaseItem);
      cartContext.toggleCartDrawer();
    }
  }, [purchaseItem, cartContext]);

  return (
    <div className={cn(block, className)}>
      {categories?.map((category: any) => (
        <CategoryPartSelector
          feature={category}
          selectionChangeHandler={handlePartSelection}
          key={category.id}
        />
      ))}
      <button
        className={`${block}__add-to-cart-button`}
        onClick={handleAddToCart}
        disabled={!purchaseItem.fulfilled}
      >
        Add to cart for ${formatAsDollar(purchaseItem.price)}
      </button>
    </div>
  );
}
