"use server";

import { createClient } from "@vercel/postgres";

import OpenAI from "openai";

export async function build() {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.images.generate({
      model: "dall-e-3",
      prompt:
        "A realistic photo of a moss green step-through bicycle with a very low or absent top tube, designed for easy mounting. Full side view, professional photo studio with solid vibrant pink-red background (#ff2450), minimalist and clean",
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

export async function getFeatures() {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();
    await client.sql`BEGIN`;

    const result = await client.sql`
      SELECT * FROM bike_builder_features
    `;

    await client.sql`COMMIT`;
    return result.rows;
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;
    console.error(
      "[ signup ]",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    await client.end();
  }
}
