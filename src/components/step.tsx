const block = "step";
import Image from "next/image";
import "./step.scss";
import { Step as StepType } from "@/app/builder/page";

type Props = {
  step: StepType;
  handleOptionSelected: (index: number) => void;
};

export default function Step({ step, handleOptionSelected }: Props) {
  return (
    <div className={`${block}__step`}>
      <h1>{step.title}</h1>
      <p>{step.description}</p>
      <div className={`${block}__step-options`}>
        {step.options.map((option, index) => (
          <div
            className={`${block}__step-option`}
            key={index}
            onClick={() => handleOptionSelected(index)}
          >
            {/* <p>{option.description}</p> */}
            <Image
              src={option.image}
              alt={option.title}
              width={48}
              height={48}
            />
            <div>{option.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// If you select "mountain wheels," then the only frame available is the full-suspension.
// If you select "fat bike wheels," then the red rim color is unavailable because the manufacturer doesn't provide it.
