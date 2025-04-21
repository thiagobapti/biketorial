// "use client";

import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { getParts } from "@/backend/store";
import cn from "classnames";
import { PartConfigurator } from "./part-configurator";
import { Part } from "@/types";
import { ChevronRight, ClockAlert } from "lucide-react";
import { formatAsDollar } from "@/util/misc";

const block = "part-page";

export type paramsType = Promise<{ id: string }>;

export default async function PartPage(props: { params: paramsType }) {
  const STATE_DEFAULT = "default";
  const STATE_ERROR = "error";
  let state: string = STATE_DEFAULT;
  const { id } = await props.params;

  const fetchData = async () => {
    try {
      return await getParts(id);
    } catch (error) {
      state = STATE_ERROR;
    }
  };

  const part: Part = ((await fetchData()) as Part[])[0] as Part;

  return (
    <div className={block}>
      <div className={`${block}__container`}>
        {state === STATE_ERROR && <div>Error...</div>}
        {state === STATE_DEFAULT && part !== undefined && (
          <div className={`${block}__part-wrapper`}>
            <div className={`${block}__part-header`}>
              <div className="container">
                <div className={`${block}__header-title`}>
                  <ChevronRight
                    width={26}
                    height={26}
                    strokeWidth={4}
                    color="#e18f00"
                  />{" "}
                  {part.label}&nbsp;
                  <span className="lowercase">{part.category_label}</span>
                </div>
              </div>
            </div>
            <div className={`${block}__part container`}>
              <div className={`${block}__part-image-wrapper`}>
                <Image
                  className={`${block}__part-image`}
                  src={`/parts/${part.id}.png`}
                  alt={part.label || ""}
                  width={878}
                  height={585}
                  priority
                />
                {/* {part.description && (
                  <div className={`${block}__part-description`}>
                    <div className={`${block}__part-description-label`}>
                      Description
                    </div>
                    {part.description}
                  </div>
                )} */}
              </div>
              <div className={`${block}__part-info`}>
                {part.description && (
                  <div className={`${block}__part-description`}>
                    <div className={`${block}__part-description-label`}>
                      Description
                    </div>
                    {part.description}
                  </div>
                )}
                <div className={`${block}__part-description`}>
                  <div className={`${block}__part-description-label`}>
                    Base price
                  </div>
                  ${formatAsDollar(part.price)}
                </div>
                {(part?.quantity_available ?? 0) > 0 && (
                  <PartConfigurator
                    className={`${block}__part-configurator`}
                    part={part}
                  />
                )}

                {(part?.quantity_available ?? 0) <= 0 && (
                  <div className={`${block}__part-description`}>
                    <div
                      className={cn(
                        `${block}__part-description-label`,
                        `${block}__part-description-label--red`
                      )}
                    >
                      <ClockAlert width={20} height={20} strokeWidth={3} />
                      Out of stock
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
