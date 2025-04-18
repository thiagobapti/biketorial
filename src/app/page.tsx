import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { getParts } from "@/backend/store";
import cn from "classnames";
import { Part } from "@/types";
import ReloadButton from "./reload-button";
import hero from "@/assets/hero.png";

const block = "page";
export default async function Page() {
  const STATE_DEFAULT = "default";
  const STATE_ERROR = "error";
  let state: string = STATE_DEFAULT;

  const fetchData = async () => {
    try {
      return await getParts();
    } catch (error) {
      state = STATE_ERROR;
    }
  };

  const parts: Part[] = (await fetchData()) as Part[];

  return (
    <div className={block}>
      <div className={`${block}__container container`}>
        {state === STATE_ERROR && (
          <div>
            Error...
            <ReloadButton />
          </div>
        )}
        {state === STATE_DEFAULT && parts !== undefined && (
          <div className={`${block}__gallery-wrapper`}>
            <div className={`${block}__hero`}>
              <div className={`${block}__hero-text`}>
                <div className={`${block}__hero-text-headline`}>
                  The perfect bike doesn’t exist. Until you build it.
                </div>

                <div className={`${block}__hero-text-subtext`}>
                  Explore the possibilities and build your dream setup with our
                  AI-powered configurator.
                </div>
                <Link className={`${block}__hero-cta`} href="/builder">
                  Open bike builder
                </Link>
              </div>
              <div className={`${block}__hero-image`}>
                <Image
                  className={`${block}__hero-image-img`}
                  src={hero}
                  alt="Biketorial"
                  width={480}
                  height={480}
                />
              </div>
            </div>
            {parts.length > 0 ? (
              <div className={`${block}__gallery`}>
                {(parts as Part[]).map((part: Part) => (
                  <div
                    className={cn(`${block}__part`, {
                      [`${block}__part--highlight`]: part.highlight,
                    })}
                    key={part.id}
                  >
                    <Image
                      className={`${block}__part-image`}
                      src={`/parts/${part.id}.png`}
                      alt={part.label}
                      width={240}
                      height={160}
                    />
                    <div>
                      {!part.quantity_available && (
                        <div className={`${block}__part-sold-out`}>
                          Sold Out
                        </div>
                      )}
                    </div>
                    <div className={`${block}__part-info`}>
                      <div className={`${block}__part-category`}>
                        {part.category_label}
                      </div>
                      <div className={`${block}__part-label`}>{part.label}</div>
                      <div className={`${block}__part-price`}>{part.price}</div>
                    </div>
                    <Link
                      className={`${block}__part-link`}
                      href={`/part/${part.id}`}
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>No results</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
