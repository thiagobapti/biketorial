"use client";

import { formatAsDollar } from "@/util/misc";
import cn from "classnames";
import "./category-part-selector.scss";
import { Category, Part } from "@/types";

type Props = {
  feature: any;
  selectionChangeHandler: (part: Part, feature: Category) => void;
};

const block = "category-part-selector";
export default function CategoryPartSelector({
  feature,
  selectionChangeHandler,
}: Props) {
  return (
    <div className={block}>
      <div className={`${block}__category-label`}>{feature.label}</div>
      <div className={`${block}__parts`}>
        {feature.parts?.map((part: any) => (
          <div
            className={cn(`${block}__part`, {
              [`${block}__part--disabled`]: part.disabled,
              [`${block}__part--selected`]: part.selected,
            })}
            key={part.id}
            onClick={() =>
              !part.disabled && selectionChangeHandler(part, feature)
            }
          >
            {part.label}
            <div
              className={cn(`${block}__part-price`, {
                [`${block}__part-price--highlight`]: part.customPrice,
              })}
            >
              +&nbsp;{formatAsDollar(part.customPrice || part.price || 0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
