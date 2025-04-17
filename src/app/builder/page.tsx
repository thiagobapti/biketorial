"use client";

import "./page.scss";
import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import { CartContext } from "@/contexts/cart";
import { handlePartSelectionWithPriceCalculation } from "@/util/misc";
import { Category, PurchaseItem } from "@/types";
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
                <div className={`${block}__breadcrumb`}>
                  {categories?.map((feature: any) => (
                    <div
                      className={cn(`${block}__breadcrumb-item`, {
                        [`${block}__breadcrumb-item--active`]:
                          feature.parts.some((part: any) => part.selected),
                      })}
                      key={feature.id}
                    ></div>
                  ))}
                </div>
              </div>
              <div className={`${block}__toolbar-actions`}>
                <button
                  className={`${block}__toolbar-actions-button`}
                  disabled={!purchaseItem.fulfilled}
                >
                  View
                </button>
                <button
                  className={`${block}__toolbar-actions-button`}
                  onClick={handleAddToCart}
                  disabled={!purchaseItem.fulfilled}
                >
                  Add to cart
                </button>
              </div>
              <div className={`${block}__toolbar-body`}>
                {categories?.map((feature: any) => (
                  <div className={`${block}__toolbar-feature`} key={feature.id}>
                    <div className={`${block}__toolbar-feature-category`}>
                      <div
                        className={`${block}__toolbar-feature-category-label`}
                      >
                        {feature.label}
                      </div>
                      <div className={`${block}__toolbar-feature-parts`}>
                        {feature.parts?.map((part: any) => (
                          <div
                            className={cn(`${block}__toolbar-feature-part`, {
                              [`${block}__toolbar-feature-part--disabled`]:
                                part.disabled,
                              [`${block}__toolbar-feature-part--selected`]:
                                part.selected,
                            })}
                            key={part.id}
                            onClick={() =>
                              !part.disabled && handlePartClick(part, feature)
                            }
                          >
                            {part.label}-{part.customPrice || part.price || 0}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${block}__preview`}>a</div>
          </div>
        )}
      </div>
    </div>
  );
}
