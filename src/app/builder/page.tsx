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
import { ChevronRight } from "lucide-react";
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
  const [categories, setCategories] = useState<Category[]>();

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
      image: undefined,
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

  const handleEditPreview = () => {
    setPurchaseItem({
      ...purchaseItem,
      image: undefined,
    });
  };

  return (
    <div className={block}>
      {" "}
      <div className={`${block}__part-header`}>
        <div className="container">
          <div className={`${block}__header-title`}>
            <ChevronRight
              width={18}
              height={18}
              strokeWidth={4}
              color="#e18f00"
            />{" "}
            Builder&nbsp;
          </div>
        </div>
      </div>
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
            <div className={`${block}__toolbar-wrapper`}>
              <div
                className={cn(`${block}__toolbar`, {
                  [`${block}__toolbar--visible`]: !purchaseItem.image,
                })}
              >
                <div className={`${block}__label`}>Instructions</div>
                <div className={`${block}__text`}>
                  Mix and match parts to create your dream bike.
                </div>

                {!categories && (
                  <div className={`${block}__loading`}>
                    <div className={`${block}__loading-text`}>
                      Loading options...
                    </div>
                    <div className={`${block}__loading-bar`}></div>
                  </div>
                )}

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
              <div className={`${block}__toolbar-actions`}>
                {!purchaseItem.image && categories && (
                  <button
                    className={`${block}__toolbar-actions-button button`}
                    disabled={!purchaseItem.fulfilled}
                    onClick={handleGenerateImage}
                    data-enabled={purchaseItem.fulfilled}
                    style={
                      {
                        "--fill-width": `${
                          categories.length > 0 && purchaseItem.parts?.length
                            ? (purchaseItem?.parts?.length /
                                categories.length) *
                              100
                            : 0
                        }%`,
                      } as React.CSSProperties
                    }
                  >
                    <span className={`${block}__cta-text`}>
                      Preview - ${formatAsDollar(purchaseItem.price)}
                    </span>
                  </button>
                )}
                {purchaseItem.image && categories && (
                  <button
                    className={`${block}__toolbar-actions-button ${block}__toolbar-actions-button--edit button`}
                    onClick={handleEditPreview}
                    data-yellow-black
                  >
                    <span className={`${block}__cta-text`}>Edit</span>
                  </button>
                )}
                {purchaseItem.image && categories && (
                  <button
                    className={`${block}__toolbar-actions-button button`}
                    onClick={handleAddToCart}
                    disabled={!purchaseItem.fulfilled}
                    data-orange-black
                    data-enabled
                  >
                    <span className={`${block}__cta-text`}>Add to cart</span>
                  </button>
                )}
              </div>
            </div>
            <div
              className={cn(`${block}__preview`, {
                [`${block}__preview--visible`]: purchaseItem.image,
              })}
            >
              {purchaseItem.image && (
                <Image
                  className={`${block}__preview-image`}
                  src={purchaseItem.image}
                  alt="Bike"
                  width={898}
                  height={598}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
