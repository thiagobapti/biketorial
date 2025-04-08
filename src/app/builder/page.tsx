"use client";

import Image from "next/image";
import "./page.scss";
import { useEffect, useState } from "react";
import Prompt from "@/components/prompt";
import Working from "@/components/working";
import Preview from "@/components/preview";
const block = "builder-page";

type Option = {
  title: string;
  description: string;
  image: string;
  selected: boolean;
};

export type Step = {
  title: string;
  description: string;
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
  const [state, setState] = useState<State>(State.Prompt);
  const [project, setProject] = useState<Project>({
    title: "Bicycle",
    steps: [
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
    ],
  });

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
        setProject({ ...project, image: result.imageUrl });
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
      const features = await response.json();
      console.log(features);
    };
    fetchFeatures();
  }, []);

  return (
    <div className={block}>
      {state === State.Prompt && (
        <Prompt
          project={project}
          setProject={setProject}
          completeCallback={handlePromptComplete}
        />
      )}
      {state === State.Working && <Working />}
      {state === State.Preview && <Preview project={project} />}
    </div>
  );
}
