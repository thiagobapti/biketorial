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

export async function getBuilder() {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();
    await client.sql`BEGIN`;

    const featuresResult = await client.sql`
      SELECT 
        builders.*,
        json_agg(
          jsonb_build_object(
            'order', builder_features."order",
            'id_category', builder_features.id_category,
            'id_builder', builder_features.id_builder,
            'category', jsonb_build_object(
              'id', categories.id,
              'label', categories.label,
              'description', categories.description
            ),
            'parts', (
              SELECT json_agg(
                jsonb_build_object(
                  'id', parts.id,
                  'label', parts.label,
                  'quantity_available', parts.quantity_available,
                  'quantity_sold', parts.quantity_sold,
                  'base_price', parts.base_price,
                  'price', parts.price,
                  'category_label', categories.label,
                  'pricing', (
                    SELECT json_agg(
                      jsonb_build_object(
                        'price', pricing.price,
                        'base_price', pricing.base_price,
                        'id_related_part', pricing.id_related_part
                      )
                    )
                    FROM public.pricing
                    WHERE pricing.id_part = parts.id
                  ),
                  'restrictions', (
                    SELECT json_agg(
                      jsonb_build_object(
                        'id_part', part_restrictions.id_part,
                        'id_part_incompatible', part_restrictions.id_part_incompatible,
                        'details', part_restrictions.details
                      )
                    )
                    FROM public.part_restrictions
                    WHERE part_restrictions.id_part = parts.id
                  )
                )
              )
              FROM public.parts
              WHERE parts.id_category = builder_features.id_category
            )
          )
          ORDER BY builder_features."order"
        ) as features 
      FROM builders
      LEFT JOIN builder_features ON builder_features.id_builder = builders.id
      LEFT JOIN categories ON categories.id = builder_features.id_category
      GROUP BY builders.id
    `;

    await client.sql`COMMIT`;
    return featuresResult.rows;
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;
    console.error(
      "[ getBuilder ]",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    await client.end();
  }
}
