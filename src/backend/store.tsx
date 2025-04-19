"use server";

import { Part } from "@/types";
import { createClient } from "@vercel/postgres";

export async function getGroupedParts(idCategory?: string, idBuilder?: string) {
  if (!idCategory && !idBuilder) return false;

  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();

    const result = await client.sql`
      SELECT
        categories.*,
        json_agg(
          jsonb_build_object(
            'id', parts.id,
            'label', parts.label,
            'quantity_available', parts.quantity_available,
            'quantity_sold', parts.quantity_sold,
            'price', parts.price,
            'description', parts.description,
            'category_label', categories.label,
            'pricing', (
              SELECT json_agg(
                jsonb_build_object(
                  'price', pricing.price,
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
        ) as parts
      FROM
        categories
      JOIN
        parts ON parts.id_category = categories.id
      LEFT JOIN
        builder_categories ON builder_categories.id_category = categories.id
      WHERE
        (${idCategory}::uuid IS NULL OR categories.id_category = ${idCategory}::uuid)
        OR categories.id IN (
          SELECT id_category
          FROM builder_categories
          WHERE id_builder = ${idBuilder}::uuid
        )
      GROUP BY
        categories.id,
        builder_categories.order
      ORDER BY
        CASE WHEN ${idBuilder}::uuid IS NOT NULL THEN builder_categories.order::text ELSE categories.label END
    `;

    return result.rows;
  } catch (error: unknown) {
    console.error(
      "[ getGroupedParts ]",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    await client.end();
  }
}

export async function getParts(id?: string): Promise<Part[]> {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();

    const result = await client.sql`
      SELECT
        parts.*,
        categories.label as category_label
      FROM
        parts
      INNER JOIN
        categories ON parts.id_category = categories.id
      WHERE
        (${id}::uuid IS NOT NULL AND parts.id = ${id}::uuid)
        OR
        (${id}::uuid IS NULL AND categories.id_category IS NULL)
      GROUP BY
        parts.id,
        categories.label
      ORDER BY
        parts.quantity_sold DESC
    `;

    // TODO: Check records keys vs type
    return result.rows as Part[];
  } catch (error: unknown) {
    throw error;
  } finally {
    await client.end();
  }
}
