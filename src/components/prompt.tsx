import Image from "next/image";
import "./prompt.scss";
import { useCallback, useState } from "react";
import Step from "./step";
import { Project } from "@/app/builder/page";
import cn from "classnames";
const block = "prompt";

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

      if (currentStep === project.steps.length - 1) {
        completeCallback();
      } else {
        setCurrentStep(currentStep + 1);
      }
    },
    [completeCallback, currentStep, project, setProject]
  );

  return (
    <div className={block}>
      {/* <div>
        {project.steps.map((step, index) => (
          <div
            className={cn(`${block}__step-nav`, {
              [`${block}__step-nav--active`]: index === currentStep,
            })}
            key={index}
          >
            {step.label}
          </div>
        ))}
      </div>
      <Step
        step={project.steps[currentStep]}
        handleOptionSelected={handleOptionSelected}
      /> */}
    </div>
  );
}
