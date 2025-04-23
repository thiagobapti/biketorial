"use server";

import { Part } from "@/types";
import { createClient } from "@vercel/postgres";
import OpenAI from "openai";

export async function generateBuildImage(partIds: string[]): Promise<{
  success: boolean;
  imageUrl: string;
}> {
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

    const parts = result.rows as Part[];

    let partsPrompt = "";
    parts.forEach((part) => {
      partsPrompt += ` ${part.category_label}: ${part.label},`;
    });

    const intro =
      "Ultra-professional studio photograph of a custom-built bicycle featuring the following parts:";
    const background =
      "Use a solid dark gray background (rgb(32, 32, 31)) covering all four edges, to ensure seamless embedding into a modern dark-themed website. No gradients, no shadows beyond the bike.";
    const layout =
      "Frame the bicycle with clean 20% padding on all sides (top, bottom, left, right) to provide visual breathing space and avoid cropping issues.";
    const lighting =
      "Use high-end studio lighting to highlight the bike’s contours and material finish, ensuring excellent detail without harsh reflections.";
    const camera =
      "Shoot at a slightly low angle with a wide lens for a dynamic, premium product feel. Full bike must be fully visible in-frame.";
    const basePrompt = `${intro} ${partsPrompt} ${background} ${layout} ${lighting} ${camera}`;

    try {
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await client.images.generate({
        model: "dall-e-3",
        prompt: basePrompt,
        size: "1024x1024",
      });

      return {
        success: true,
        imageUrl: response.data[0].url || "",
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
