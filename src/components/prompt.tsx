import Image from "next/image";
import "./prompt.scss";
import { useCallback, useState } from "react";
import Step from "./step";
import { Builder } from "@/app/builder/page";
import cn from "classnames";
const block = "prompt";

type Props = {
  builder: Builder;
  setBuilder: (builder: Builder) => void;
  completeCallback: () => void;
};

export default function Prompt({
  builder,
  setBuilder,
  completeCallback,
}: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleOptionSelected = useCallback(
    (index: number) => {
      const newFeatures = builder.features.map((feature, featureIndex) => {
        if (featureIndex === currentStep) {
          return {
            ...feature,
            parts: feature.parts.map((part, partIndex) => ({
              ...part,
              selected: partIndex === index,
            })),
          };
        }
        return feature;
      });
      setBuilder({ ...builder, features: newFeatures });

      if (currentStep === builder.features.length - 1) {
        completeCallback();
      } else {
        setCurrentStep(currentStep + 1);
      }
    },
    [completeCallback, currentStep, builder, setBuilder]
  );

  return (
    <div className={block}>
      {/* <div>
        {builder.features.map((feature, index) => (
          <div
            className={cn(`${block}__step-nav`, {
              [`${block}__step-nav--active`]: index === currentStep,
            })}
            key={index}
          >
            {feature.label}
          </div>
        ))}
      </div>
      <Step
        feature={builder.features[currentStep]}
        handleOptionSelected={handleOptionSelected}
      /> */}
    </div>
  );
}
