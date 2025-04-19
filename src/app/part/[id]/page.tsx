// "use client";

import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { getParts } from "@/backend/store";
import cn from "classnames";
import { PartConfigurator } from "./part-configurator";
import { Part } from "@/types";

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
      <div className={`${block}__container container`}>
        {state === STATE_ERROR && <div>Error...</div>}
        {state === STATE_DEFAULT && part !== undefined && (
          <div className={`${block}__part-wrapper`}>
            <div className={`${block}__part-header`}>
              <div className={`${block}__header-title`}>
                {part.label}&nbsp;
                <span className="lowercase">{part.category_label}</span>
              </div>
            </div>
            <div className={`${block}__part`}>
              <div className={`${block}__part-image-wrapper`}>
                <Image
                  className={`${block}__part-image`}
                  src={`/parts/${part.id}.png`}
                  alt={part.label || ""}
                  width={878}
                  height={585}
                  priority
                />
                {part.description && (
                  <div className={`${block}__part-description`}>
                    {part.description}
                  </div>
                )}
              </div>
              <div className={`${block}__part-info`}>
                <PartConfigurator part={part} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
