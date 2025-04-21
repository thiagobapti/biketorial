"use server";

import { Part } from "@/types";
import { createClient } from "@vercel/postgres";

import OpenAI from "openai";

type Props = {
  partIds: string[];
};

export async function build({ partIds }: Props) {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();

    const idList = partIds.join(",");

    const result = await client.sql`
      SELECT
        parts.label,
        categories.label as category_label
      FROM
        parts
      INNER JOIN
        categories ON parts.id_category = categories.id
      WHERE
        parts.id IN (SELECT unnest(string_to_array(${idList}, ','))::uuid)
      GROUP BY
        parts.id,
        categories.label
      ORDER BY
        parts.quantity_sold DESC
    `;

    let basePrompt = "";
    // "Let's create an image representing a real bicycle built with the following parts:";

    const parts = result.rows as Part[];

    parts.forEach((part) => {
      basePrompt += ` ${part.category_label}: ${part.label},`;
    });

    basePrompt =
      "Professional photo of an bicycle built with the following parts:" +
      basePrompt;

    basePrompt +=
      "The image will be used to showcase this bike for sale on a dark modern website. I want a dark gray background(rgb(32 32 31)) preferably solid on all four edges so I can seamlesly embed this image on a dark background. Give me 20% of margin on the top and bottom and on the sides.";

    try {
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await client.images.generate({
        model: "dall-e-3",
        prompt: basePrompt,
        size: "1024x1024",
      });

      console.log("Image generated:", response.data[0].url);

      return {
        success: true,
        imageUrl: response.data[0].url,
      };
    } catch (error) {
      throw error;
    }
  } catch (error: unknown) {
    throw error;
  } finally {
    await client.end();
  }
}
