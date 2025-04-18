"use server";

import { createClient } from "@vercel/postgres";

import OpenAI from "openai";

export async function build(prompt: string) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
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
