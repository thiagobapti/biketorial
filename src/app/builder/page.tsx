"use client";

import Image from "next/image";
import "./page.scss";
import { useEffect, useState } from "react";
import Prompt from "@/components/prompt";
import Working from "@/components/working";
import Preview from "@/components/preview";
const block = "builder-page";

type Option = {
  id: string;
  label: string;
  selected: boolean;
};

export type Step = {
  id: string;
  label: string;
  options: Option[];
};

export type Project = {
  title: string;
  steps: Step[];
  image?: string;
};

export default function BuilderPage() {
  enum State {
    Prompt = "prompt",
    Working = "working",
    Preview = "preview",
  }
  const [state, setState] = useState<State>(State.Working);
  const [project, setProject] = useState<Project>();
  const handlePromptComplete = async () => {
    setState(State.Working);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        // setProject({ ...project, image: result.imageUrl });
        setState(State.Preview);
      } else {
        console.error("Error building bicycle:", result.error);
        setState(State.Prompt);
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setState(State.Prompt);
    }
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      const response = await fetch("/api/features");
      const options = await response.json();
      console.log("options", options);
      setState(State.Prompt);
      setProject({
        title: "No title",
        steps: options,
      });
    };
    fetchFeatures();
  }, [State.Prompt]);

  return (
    <div className={block}>
      {state === State.Prompt && project && (
        <Prompt
          project={project}
          setProject={setProject}
          completeCallback={handlePromptComplete}
        />
      )}
      {state === State.Working && <Working />}
      {state === State.Preview && project && <Preview project={project} />}
    </div>
  );
}
