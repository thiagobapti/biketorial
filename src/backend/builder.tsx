"use server";

import OpenAI from "openai";

export async function build() {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.images.generate({
      model: "dall-e-2",
      prompt:
        "A simple, minimalist bicycle with a clean white background. 2D design, outline style.",
      n: 1,
      size: "256x256",
    });

    console.log("Image generated:", response.data[0].url);

    return {
      success: true,
      imageUrl: response.data[0].url,
    };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
