import Image from "next/image";
import "./step.scss";
import { Feature as FeatureType, Part } from "@/app/builder/page";
import cn from "classnames";

type Props = {
  feature: FeatureType;
  handleOptionSelected: (index: number) => void;
};

const block = "step";
export default function Step({ feature, handleOptionSelected }: Props) {
  console.log(feature);
  return (
    <div className={`${block}`}>
      <h1>{feature.label}</h1>
      <div className={`${block}__step-options`}>
        {feature.parts.map((part: Part, index: number) => (
          <div
            className={cn(`${block}__step-option`, {
              [`${block}__step-option--selected`]: part.selected,
            })}
            key={index}
            onClick={() => handleOptionSelected(index)}
          >
            {/* <p>{option.description}</p> */}
            {/* <Image
              src={option.image}
              alt={option.title}
              width={48}
              height={48}
            /> */}
            <div>{part.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// If you select "mountain wheels," then the only frame available is the full-suspension.
// If you select "fat bike wheels," then the red rim color is unavailable because the manufacturer doesn't provide it.
