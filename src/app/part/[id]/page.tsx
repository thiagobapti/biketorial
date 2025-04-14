// "use client";

import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import {
  getCategoryByPartId,
  getPartData,
  getRelatedCategoriesAndParts,
} from "@/backend/store";
import cn from "classnames";
import { PurchaseItem } from "@/types";
import { ClientInteractions } from "./ClientInteractions";

const block = "part-page";

export type paramsType = Promise<{ id: string }>;

export default async function PartPage(props: { params: paramsType }) {
  const { id } = await props.params;
  let galleryData: any[] = [];
  let category: any;
  let relatedCategoriesAndParts: any[] = [];

  const fetchData = async () => {
    const partData = await getPartData(id);
    const getCategoryByPartIdResponse = await getCategoryByPartId(id);
    const getRelatedCategoriesAndPartsResponse =
      await getRelatedCategoriesAndParts(id);

    console.log(getRelatedCategoriesAndPartsResponse);

    galleryData = partData || [];
    category = getCategoryByPartIdResponse;
    relatedCategoriesAndParts = getRelatedCategoriesAndPartsResponse || [];
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
            <ClientInteractions
              categories={relatedCategoriesAndParts}
              part={galleryData}
            />
          </div>
        </div>
      </div>
      {/* <ClientInteractions
        purchaseItem={purchaseItem}
        blockName={block}
        showAddToCart={true}
      /> */}
    </div>
  );
}
