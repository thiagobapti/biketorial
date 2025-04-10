"use client";

import Image from "next/image";
import "./page.scss";
import { useEffect, useState } from "react";
import Prompt from "@/components/prompt";
import Working from "@/components/working";
import Preview from "@/components/preview";
const block = "builder-page";

export type Part = {
  id: string;
  label: string;
  selected: boolean;
};

export type Modifier = {
  id: string;
  label: string;
  selected: boolean;
};

export type Feature = {
  id: string;
  label: string;
  parts: Part[];
  modifiers: Modifier[];
};

export type Builder = {
  label: string;
  features: Feature[];
  image?: string;
};

export default function BuilderPage() {
  enum State {
    Prompt = "prompt",
    Working = "working",
    Preview = "preview",
  }
  const [state, setState] = useState<State>(State.Working);
  const [builder, setBuilder] = useState<Builder>();
  const handlePromptComplete = async () => {
    setState(State.Working);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ builder }),
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
      const response = await fetch("/api/builder");
      const builder = await response.json();
      console.log("builder", builder);
      setState(State.Prompt);
      setBuilder(builder);
    };
    fetchFeatures();
  }, [State.Prompt]);

  return (
    <div className={block}>
      {state === State.Prompt && builder && (
        <Prompt
          builder={builder}
          setBuilder={setBuilder}
          completeCallback={handlePromptComplete}
        />
      )}
      {state === State.Working && <Working />}
      {state === State.Preview && builder && <Preview builder={builder} />}
    </div>
  );
}
