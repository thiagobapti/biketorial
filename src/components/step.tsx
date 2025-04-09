import Image from "next/image";
import "./step.scss";
import { Step as StepType } from "@/app/builder/page";
import cn from "classnames";

type Props = {
  step: StepType;
  handleOptionSelected: (index: number) => void;
};

const block = "step";
export default function Step({ step, handleOptionSelected }: Props) {
  console.log(step);
  return (
    <div className={`${block}`}>
      <h1>{step.label}</h1>
      <div className={`${block}__step-options`}>
        {step.options.map((option, index) => (
          <div
            className={cn(`${block}__step-option`, {
              [`${block}__step-option--selected`]: option.selected,
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
            <div>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// If you select "mountain wheels," then the only frame available is the full-suspension.
// If you select "fat bike wheels," then the red rim color is unavailable because the manufacturer doesn't provide it.
