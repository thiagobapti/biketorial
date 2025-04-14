"use client";

import "./page.scss";
import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import { CartContext } from "@/contexts/cart";
import {
  allFeaturesComplete,
  handlePartSelection,
  calculatePricesAndDisabledStates,
} from "@/util/misc";
import { PurchaseItem } from "@/types";
const block = "builder-page";

export type Restriction = {
  id_part: string;
  id_part_incompatible: string;
  details: string | null;
};

export default function BuilderPage() {
  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem>({
    fullfilled: false,
    price: 0,
  });
  enum State {
    Default = "default",
  }
  const [state, setState] = useState<State>(State.Default);
  const [builder, setBuilder] = useState<any>();
  const [shouldCalculatePrices, setShouldCalculatePrices] = useState(false);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const fetchBuilder = async () => {
      const response = await fetch("/api/builder");
      const builder = await response.json();
      setBuilder(builder[0]);
      setShouldCalculatePrices(true);
    };
    fetchBuilder();
  }, []);

  const handlePartClick = (part: any, feature: any) => {
    if (!builder) return;

    // Only update the selection for the current feature, preserving other feature selections
    const updatedFeatures = builder.features.map((currentFeature: any) => {
      if (currentFeature.id_category === feature.id_category) {
        return {
          ...currentFeature,
          parts: currentFeature.parts.map((_part: any) => ({
            ..._part,
            selected: _part.id === part.id,
          })),
        };
      }
      return currentFeature;
    });

    setBuilder({
      ...builder,
      features: updatedFeatures,
    });

    setShouldCalculatePrices(true);
  };

  useEffect(() => {
    if (!shouldCalculatePrices || !builder) return;

    const { updatedItems, totalPrice, isFullfilled } =
      calculatePricesAndDisabledStates(builder.features);

    setBuilder({
      ...builder,
      features: updatedItems,
    });

    setPurchaseItem({
      ...purchaseItem,
      fullfilled: isFullfilled,
      item: {
        ...builder,
        features: updatedItems,
      },
      price: totalPrice,
    });

    setShouldCalculatePrices(false);
  }, [shouldCalculatePrices, builder, purchaseItem]);

  const handleAddToCart = () => {
    cartContext.updateItems([purchaseItem]);
  };

  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        <div className={`${block}__toolbar`}>
          <div className={`${block}__toolbar-header`}>
            <div className={`${block}__toolbar-header-label`}>
              {builder?.label} - Total Price: {purchaseItem.price}
            </div>
            <div className={`${block}__breadcrumb`}>
              {builder?.features.map((feature: any) => (
                <div
                  className={cn(`${block}__breadcrumb-item`, {
                    [`${block}__breadcrumb-item--active`]: feature.parts.some(
                      (part: any) => part.selected
                    ),
                  })}
                  key={feature.id_category}
                ></div>
              ))}
            </div>
          </div>
          <div className={`${block}__toolbar-actions`}>
            <button
              className={`${block}__toolbar-actions-button`}
              disabled={!purchaseItem.fullfilled}
            >
              View
            </button>
            <button
              className={`${block}__toolbar-actions-button`}
              onClick={handleAddToCart}
              disabled={!purchaseItem.fullfilled}
            >
              Add to cart
            </button>
          </div>
          <div className={`${block}__toolbar-body`}>
            {builder?.features.map((feature: any) => (
              <div
                className={`${block}__toolbar-feature`}
                key={feature.id_category}
              >
                <div className={`${block}__toolbar-feature-category`}>
                  <div className={`${block}__toolbar-feature-category-label`}>
                    {feature.category.label}
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
                        {part.label}-{part.priceValue || 0}
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
    </div>
  );
}
