const block = "preview";

import { Builder } from "@/app/builder/page";
import "./preview.scss";
import Image from "next/image";
import Step from "./step";

type Props = {
  builder: Builder;
};

export default function Preview({ builder }: Props) {
  return (
    <div className={block}>
      <div className={`${block}__viewport`}>
        {builder?.image && (
          <Image
            src={builder.image}
            alt={builder.label}
            width={512}
            height={512}
          />
        )}
      </div>
      <div className={`${block}__toolbar`}>
        {builder.features.map((feature, index) => (
          <Step feature={feature} key={index} handleOptionSelected={() => {}} />
        ))}
      </div>
    </div>
  );
}
