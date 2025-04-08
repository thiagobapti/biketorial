import Image from "next/image";
import "./prompt.scss";
import { useCallback, useState } from "react";
const block = "prompt";

type Option = {
  title: string;
  description: string;
  image: string;
  selected: boolean;
};

type Step = {
  title: string;
  description: string;
  options: Option[];
};

type Props = {
  completeCallback: () => void;
};

export default function Prompt({ completeCallback }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([
    {
      title: "Color",
      description: "",
      options: [
        {
          title: "Red",
          description: "",
          image: "https://placehold.co/48x48/png?text=Red",
          selected: false,
        },
        {
          title: "Blue",
          description: "",
          image: "https://placehold.co/48x48/png?text=Blue",
          selected: false,
        },
        {
          title: "Green",
          description: "",
          image: "https://placehold.co/48x48/png?text=Green",
          selected: false,
        },
      ],
    },
    {
      title: "Frame type",
      description: "Choose the frame type you want to use",
      options: [
        {
          title: "Full-suspension",
          description: "",
          image: "https://placehold.co/48x48/png?text=Full+suspension",
          selected: false,
        },
        {
          title: "Diamond",
          description: "",
          image: "https://placehold.co/48x48/png?text=Diamond",
          selected: false,
        },
        {
          title: "Step-through",
          description: "",
          image: "https://placehold.co/48x48/png?text=Step+through",
          selected: false,
        },
      ],
    },
    {
      title: "Frame finish",
      description: "Choose the frame finish you want to use",
      options: [
        {
          title: "Matte",
          description: "",
          image: "https://placehold.co/48x48/png?text=Matte",
          selected: false,
        },
        {
          title: "Shiny",
          description: "",
          image: "https://placehold.co/48x48/png?text=Shiny",
          selected: false,
        },
      ],
    },
    {
      title: "Wheels",
      description: "Choose the wheels you want to use",
      options: [
        {
          title: "Road wheels",
          description: "",
          image: "https://placehold.co/48x48/png?text=Road+wheels",
          selected: false,
        },
        {
          title: "Mountain wheels",
          description: "",
          image: "https://placehold.co/48x48/png?text=Mountain+wheels",
          selected: false,
        },
        {
          title: "Fat bike wheels",
          description: "",
          image: "https://placehold.co/48x48/png?text=Fat+bike+wheels",
          selected: false,
        },
      ],
    },
    {
      title: "Rim color",
      description: "Choose the rim color you want to use",
      options: [
        {
          title: "Red",
          description: "",
          image: "https://placehold.co/48x48/png?text=Red",
          selected: false,
        },
        {
          title: "Black",
          description: "",
          image: "https://placehold.co/48x48/png?text=Black",
          selected: false,
        },
        {
          title: "Blue",
          description: "",
          image: "https://placehold.co/48x48/png?text=Blue",
          selected: false,
        },
      ],
    },
    {
      title: "Chain",
      description: "Choose the chain you want to use",
      options: [
        {
          title: "Single-speed chain",
          description: "",
          image: "https://placehold.co/48x48/png?text=Single-speed+chain",
          selected: false,
        },
        {
          title: "8-speed chain",
          description: "",
          image: "https://placehold.co/48x48/png?text=8-speed+chain",
          selected: false,
        },
      ],
    },
  ]);

  const handleOptionSelected = useCallback(
    (index: number) => {
      if (currentStep === steps.length - 1) {
        completeCallback();
        return;
      }
      const newSteps = steps.map((step, stepIndex) => {
        if (stepIndex === currentStep) {
          return {
            ...step,
            options: step.options.map((option, optionIndex) => ({
              ...option,
              selected: optionIndex === index,
            })),
          };
        }
        return step;
      });
      setSteps(newSteps);
      setCurrentStep(currentStep + 1);
    },
    [completeCallback, currentStep, steps]
  );

  return (
    <div className={block}>
      <div className={`${block}__step`}>
        <h1>{steps[currentStep].title}</h1>
        <p>{steps[currentStep].description}</p>
        <div className={`${block}__step-options`}>
          {steps[currentStep].options.map((option, index) => (
            <div
              className={`${block}__step-option`}
              key={index}
              onClick={() => handleOptionSelected(index)}
            >
              <h2>{option.title}</h2>
              <p>{option.description}</p>
              <Image
                src={option.image}
                alt={option.title}
                width={48}
                height={48}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
