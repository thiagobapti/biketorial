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

type Project = {
  title: string;
  steps: Step[];
};

type Props = {
  project: Project;
  setProject: (project: Project) => void;
  completeCallback: () => void;
};

export default function Prompt({
  project,
  setProject,
  completeCallback,
}: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleOptionSelected = useCallback(
    (index: number) => {
      if (currentStep === project.steps.length - 1) {
        completeCallback();
        return;
      }
      const newSteps = project.steps.map((step, stepIndex) => {
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
      setProject({ ...project, steps: newSteps });
      setCurrentStep(currentStep + 1);
    },
    [completeCallback, currentStep, project, setProject]
  );

  return (
    <div className={block}>
      <div className={`${block}__step`}>
        <h1>{project.steps[currentStep].title}</h1>
        <p>{project.steps[currentStep].description}</p>
        <div className={`${block}__step-options`}>
          {project.steps[currentStep].options.map((option, index) => (
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
