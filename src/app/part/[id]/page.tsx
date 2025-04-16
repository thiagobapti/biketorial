// "use client";

import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { getParts } from "@/backend/store";
import cn from "classnames";
import { PartConfigurator } from "./part-configurator";
import { Part, SafeState } from "@/types";

const block = "part-page";

export type paramsType = Promise<{ id: string }>;

export default async function PartPage(props: { params: paramsType }) {
  const { id } = await props.params;

  const fetchData = async (): Promise<SafeState<Part>> => {
    const result = await getParts(id);
    return result && typeof result === "object"
      ? { status: "success", data: result[0] }
      : { status: "error" };
  };

  const part = await fetchData();

  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        {part.status === "error" && <div>Error...</div>}
        {part.status === "success" && (
          <div>
            <div>
              Biketorial
              <Link href="/builder">Builder</Link>
            </div>
            <div className={`${block}__gallery`}>
              <div className={`${block}__gallery-media`}>
                <div className={`${block}__part`} key={part.data.id}>
                  <Image
                    className={`${block}__part-image`}
                    src={`/parts/${part.data.id}.png`}
                    alt={part.data.label || ""}
                    width={240}
                    height={160}
                    priority
                  />
                </div>
              </div>
              <div className={`${block}__gallery-info`}>
                <div className={`${block}__part`} key={part.data.id}>
                  {/* <div>{category?.label}</div> */}
                  {part.data.label}-{part.data.price}
                  <PartConfigurator part={part.data} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
