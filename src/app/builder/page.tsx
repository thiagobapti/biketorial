"use client";

import "./page.scss";
import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import { CartContext } from "@/contexts/cart";
import {
  handlePartSelectionWithPriceCalculation,
  formatAsDollar,
} from "@/util/misc";
import { Category, PurchaseItem } from "@/types";
import { build } from "@/backend/builder";
import Image from "next/image";
import CategoryPartSelector from "@/components/category-part-selector";
const block = "builder-page";

export type Restriction = {
  id_part: string;
  id_part_incompatible: string;
  details: string | null;
};

export default function BuilderPage() {
  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem>({
    fulfilled: false,
    price: 0,
    label: "Custom Build",
    id_builder: "b1ac25e7-90e1-463b-9efd-fe075da00ea3",
  });
  enum State {
    Default = "default",
    Error = "error",
  }
  const [state, setState] = useState<State>(State.Default);
  const cartContext = useContext(CartContext);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchBuilder = async () => {
      const response = await fetch("/api/builder");
      const builder = await response.json();

      const { updatedItems, totalPrice, isfulfilled, allSelectedParts } =
        handlePartSelectionWithPriceCalculation(null, null, builder.categories);
      setCategories(updatedItems);

      setPurchaseItem((prevPurchaseItem) => ({
        ...prevPurchaseItem,
        id_builder: builder.id,
        price: totalPrice,
        fulfilled: isfulfilled,
        parts: allSelectedParts,
      }));
    };
    fetchBuilder();
  }, []);

  const handlePartClick = (part: any, feature: any) => {
    if (!categories) return;

    const { updatedItems, totalPrice, isfulfilled, allSelectedParts } =
      handlePartSelectionWithPriceCalculation(part, feature, categories);

    setCategories(updatedItems);

    setPurchaseItem({
      ...purchaseItem,
      parts: allSelectedParts,
      price: totalPrice,
      fulfilled: isfulfilled,
    });
  };

  const handleAddToCart = () => {
    cartContext.append(purchaseItem);
    cartContext.toggleCartDrawer();
  };

  const handleGenerateImage = async () => {
    const prompt =
      "A realistic photo of a moss green step-through bicycle with a very low or absent top tube, designed for easy mounting. Full side view, professional photo studio with solid vibrant pink-red background (#ff2450), minimalist and clean";

    const result = await build(prompt);
    console.log(result);

    setPurchaseItem({
      ...purchaseItem,
      image: result.imageUrl,
    });
  };

  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        {state === State.Error && (
          <div className={`${block}__error`}>
            <div className={`${block}__error-message`}>
              Error loading builder
            </div>
          </div>
        )}
        {state === State.Default && (
          <div className={`${block}__builder`}>
            <div className={`${block}__toolbar`}>
              <div className={`${block}__toolbar-header`}>
                <div className={`${block}__toolbar-header-label`}>
                  {purchaseItem.label} - Total Price: {purchaseItem.price}
                </div>
              </div>
              <div className={`${block}__toolbar-actions`}>
                <button
                  className={`${block}__toolbar-actions-button`}
                  disabled={!purchaseItem.fulfilled}
                  onClick={handleGenerateImage}
                  style={
                    {
                      "--fill-width": `${
                        categories.length > 0 && purchaseItem.parts?.length
                          ? (purchaseItem?.parts?.length / categories.length) *
                            100
                          : 0
                      }%`,
                    } as React.CSSProperties
                  }
                >
                  <span className={`${block}__cta-text`}>Preview</span>
                </button>
                <button
                  className={`${block}__toolbar-actions-button2`}
                  onClick={handleAddToCart}
                  disabled={!purchaseItem.fulfilled}
                >
                  Add to cart
                </button>
              </div>
              <div className={`${block}__toolbar-body`}>
                {categories?.map((feature: any) => (
                  <CategoryPartSelector
                    feature={feature}
                    selectionChangeHandler={handlePartClick}
                    key={feature.id}
                  />
                ))}
              </div>
            </div>
            <div className={`${block}__preview`}>
              {purchaseItem.image && (
                <Image
                  className={`${block}__preview-image`}
                  src={purchaseItem.image}
                  alt="Bike"
                  width={240}
                  height={160}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
