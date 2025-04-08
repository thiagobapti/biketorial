const block = "preview";

import { Project } from "@/app/builder/page";
import "./preview.scss";
import Image from "next/image";

type Props = {
  project: Project;
};

export default function Preview({ project }: Props) {
  return (
    <div className={block}>
      {project?.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={256}
          height={256}
        />
      )}
    </div>
  );
}
