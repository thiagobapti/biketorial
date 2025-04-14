// "use client";

import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import {
  getCategoryByPartId,
  getPartData,
  getRelatedCategoriesAndParts,
} from "@/backend/store";
import cn from "classnames";

const block = "part-page";

type Category = {
  id: string;
  label: string;
};

type Part = {
  id: string;
  label: string;
  category: Category;
  regular_price: number;
  discount_price: number;
  quantity_sold: number;
  quantity_available: number;
};
export type paramsType = Promise<{ id: string }>;

export default async function PartPage(props: { params: paramsType }) {
  const { id } = await props.params;
  let galleryData: any[] = [];
  let category: any;
  let relatedCategoriesAndParts: any[] = [];
  const fetchData = async () => {
    const getGalleryDataResponse = await getPartData(id);
    const getCategoryByPartIdResponse = await getCategoryByPartId(id);
    const getRelatedCategoriesAndPartsResponse =
      await getRelatedCategoriesAndParts(id);

    console.log(getRelatedCategoriesAndPartsResponse);

    galleryData = getGalleryDataResponse || [];
    category = getCategoryByPartIdResponse;
    relatedCategoriesAndParts = getRelatedCategoriesAndPartsResponse;
  };

  await fetchData();

  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        <div>
          Biketorial
          <Link href="/builder">Builder</Link>
        </div>
        <div>{category?.label}</div>
        <div className={`${block}__gallery`}>
          {Array.isArray(galleryData) &&
            galleryData.map((part) => (
              <div className={`${block}__part`} key={part.id_part}>
                <Image
                  className={`${block}__part-image`}
                  src={`/parts/${part.id_part}.png`}
                  alt={part.label}
                  width={240}
                  height={160}
                  priority
                />
                {part.label}-{part.price}
              </div>
            ))}
          <div>
            {relatedCategoriesAndParts.map((category: any) => (
              <div className={`${block}__toolbar-feature`} key={category.id}>
                <div className={`${block}__toolbar-feature-category`}>
                  <div className={`${block}__toolbar-feature-category-label`}>
                    {category.label}
                  </div>
                  <div className={`${block}__toolbar-feature-parts`}>
                    {category.parts?.map((part: any) => (
                      <div
                        className={cn(`${block}__toolbar-feature-part`, {
                          [`${block}__toolbar-feature-part--disabled`]:
                            part.disabled,
                          [`${block}__toolbar-feature-part--selected`]:
                            part.selected,
                        })}
                        key={part.id}
                        // onClick={() => handlePartSelection(part, feature)}
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
        {/* {parts.map((part) => (
          <div className={`${block}__part`} key={part.id}>
            {!part.quantity_available && (
              <div style={{ color: "red" }}>Out of stock</div>
            )}
            {part.category.label}
            <br />
            {part.label}
            <br />
            <span
              style={{
                textDecoration: part.discount_price ? "line-through" : "",
              }}
            >
              {part.regular_price}
            </span>
            {part.discount_price && ` / ${part.discount_price}`}
          </div>
        ))}*/}
      </div>
    </div>
  );
}
