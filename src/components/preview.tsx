const block = "preview";

import { Project } from "@/app/builder/page";
import "./preview.scss";
import Image from "next/image";
import Step from "./step";

type Props = {
  project: Project;
};

export default function Preview({ project }: Props) {
  return (
    <div className={block}>
      <div className={`${block}__viewport`}>
        {project?.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={512}
            height={512}
          />
        )}
      </div>
      <div className={`${block}__toolbar`}>
        {project.steps.map((step, index) => (
          <Step step={step} key={index} handleOptionSelected={() => {}} />
        ))}
      </div>
    </div>
  );
}
