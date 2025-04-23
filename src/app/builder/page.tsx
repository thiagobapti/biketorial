"use client";

import "./page.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import cn from "classnames";
import { CartContext } from "@/contexts/cart";
import {
  handlePartSelectionWithPriceCalculation,
  formatAsDollar,
} from "@/util/misc";
import { Category, PurchaseItem } from "@/types";
import { generateBuildImage } from "@/backend/builder";
import Image from "next/image";
import CategoryPartSelector from "@/components/category-part-selector";
import { ChevronRight } from "lucide-react";
import { GlobalContext } from "@/contexts/global";
const block = "builder-page";

export default function BuilderPage() {
  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem>({
    fulfilled: false,
    price: 0,
    label: "Custom Build",
    id_builder: "b1ac25e7-90e1-463b-9efd-fe075da00ea3",
  });

  const globalContext = useContext(GlobalContext);
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

  const handleGenerateImage = async () => {
    if (purchaseItem === undefined || !purchaseItem.parts) return;

    globalContext.setWorkingText("Wait until the AI model builds your bike");

    const result = await generateBuildImage(
      purchaseItem.parts.map((part) => part.id)
    );

    setPurchaseItem({
      ...purchaseItem,
      image: result.imageUrl,
    });
    globalContext.setWorkingText("");
    globalContext.setModalText("");
  };

  const handleEditPreview = () => {
    setPurchaseItem({
      ...purchaseItem,
      image: undefined,
    });
  };

  const handleAddToCart = useCallback(() => {
    if (purchaseItem.fulfilled) {
      cartContext.append(purchaseItem);
      cartContext.toggleCartDrawer();
    }
  }, [purchaseItem, cartContext]);

  return (
    <div className={block}>
      <div className={`${block}__part-header`}>
        <div className="container">
          <div className={`${block}__header-title`}>
            <ChevronRight
              width={26}
              height={26}
              strokeWidth={4}
              color="#e18f00"
            />{" "}
            Builder&nbsp;
          </div>
        </div>
      </div>
      <div className={`${block}__container container`}>
        <div className={`${block}__builder`}>
          <div
            className={cn(`${block}__toolbar-wrapper`, {
              [`${block}__toolbar-wrapper--absolute`]: purchaseItem.image,
            })}
          >
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
                          ? (purchaseItem?.parts?.length / categories.length) *
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
                  <span className={`${block}__cta-text`}>
                    Add to cart - ${formatAsDollar(purchaseItem.price)}
                  </span>
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
                width={880}
                height={880}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
