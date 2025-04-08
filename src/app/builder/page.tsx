"use client";

import Image from "next/image";
import "./page.scss";
import { useState } from "react";
import Prompt from "@/components/prompt";
import Working from "@/components/working";
import Preview from "@/components/preview";

const block = "builder-page";
export default function BuilderPage() {
  enum State {
    Prompt = "prompt",
    Working = "working",
    Preview = "preview",
  }
  const [state, setState] = useState<State>(State.Prompt);
  return (
    <div className={block}>
      {state === State.Prompt && (
        <Prompt completeCallback={() => setState(State.Working)} />
      )}
      {state === State.Working && <Working />}
      {state === State.Preview && <Preview />}
    </div>
  );
}
