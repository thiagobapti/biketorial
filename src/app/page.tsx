// "use client";

import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { getGalleryData } from "@/backend/store";

const block = "page";

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

export default async function Page() {
  let galleryData: any[] = [];

  const fetchData = async () => {
    const getGalleryDataResponse = await getGalleryData();

    galleryData = getGalleryDataResponse || [];
  };

  await fetchData();

  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        <div>
          Biketorial
          <Link href="/builder">Builder</Link>
        </div>
        <div className={`${block}__gallery`}>
          {Array.isArray(galleryData) &&
            galleryData.map((part) => (
              <div className={`${block}__part`} key={part.id_part}>
                {part.label}-{part.price}
                <Image
                  className={`${block}__part-image`}
                  src={`/parts/${part.id_part}.png`}
                  alt={part.label}
                  width={240}
                  height={160}
                />
                <br />
                <Link href={`/part/${part.id_part}`}>View</Link>
              </div>
            ))}
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
