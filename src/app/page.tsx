import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { getParts } from "@/backend/store";
import cn from "classnames";
import { Part } from "@/types";
import ReloadButton from "./reload-button";
import hero from "@/assets/hero.png";
import { formatAsDollar } from "@/util/misc";
import { ClockAlert } from "lucide-react";

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
      <div className={`${block}__container`}>
        {state === STATE_ERROR && (
          <div>
            Error...
            <ReloadButton />
          </div>
        )}
        {state === STATE_DEFAULT && parts !== undefined && (
          <div className={`${block}__gallery-wrapper`}>
            <div className={`${block}__hero`}>
              <div className={`${block}__hero-container container`}>
                <div className={`${block}__hero-text`}>
                  <div className={`${block}__hero-text-headline`}>
                    The perfect bike doesn’t exist. Until you build it.
                  </div>

                  <div className={`${block}__hero-text-subtext`}>
                    Explore the possibilities and build your dream setup with
                    our AI-powered configurator.
                  </div>
                  <Link className={`${block}__hero-cta`} href="/builder">
                    Build mine
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
            </div>
            <div className={`container`}>
              <div className={`${block}__gallery-headline`}>Featured parts</div>
              {parts.length > 0 ? (
                <div className={`${block}__gallery `}>
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
                        width={280}
                        height={180}
                      />

                      <div className={`${block}__part-info`}>
                        {!part.quantity_available && (
                          <div className={`${block}__part-sold-out`}>
                            <ClockAlert
                              width={15}
                              height={15}
                              strokeWidth={3}
                            />
                            Sold Out
                          </div>
                        )}
                        <div className={`${block}__part-label`}>
                          {part.label}
                          <span className="lowercase">
                            &nbsp;{part.category_label}
                          </span>
                        </div>
                        <div className={`${block}__part-price`}>
                          from ${formatAsDollar(part.price)}
                        </div>
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
          </div>
        )}
      </div>
    </div>
  );
}
