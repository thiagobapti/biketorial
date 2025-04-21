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
      "Professional photo of an bicycle on smooth corian platform, surrounded by smoke in a gradient from orange to bright gold, creating an ethereal and electrifying effect, striking and vivid product copy space. the bicycle is built with the following parts:" +
      basePrompt;

    // basePrompt +=
    //   "The image will be used to showcase this bike on a dark modern website. The background should be simple and not distracting and dark, like a flat foam wall . Let's keep about 20% of the image empty on the sides and top";

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
