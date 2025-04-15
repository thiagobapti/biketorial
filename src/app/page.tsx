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
                <Image
                  className={`${block}__part-image`}
                  src={`/parts/${part.id_part}.png`}
                  alt={part.label}
                  width={240}
                  height={160}
                />
                <div className={`${block}__part-info`}>
                  <div className={`${block}__part-category`}>
                    {part.category_label}
                  </div>
                  <div className={`${block}__part-label`}>{part.label}</div>
                  <div className={`${block}__part-price`}>{part.price}</div>
                </div>
                <Link
                  className={`${block}__part-link`}
                  href={`/part/${part.id_part}`}
                >
                  View
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
