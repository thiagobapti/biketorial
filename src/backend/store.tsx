"use server";

import { createClient } from "@vercel/postgres";

import OpenAI from "openai";

export async function getCategories(id?: string) {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();
    await client.sql`BEGIN`;

    const result = await client.sql`
      SELECT 
        * 
      FROM 
        categories
      WHERE
        id = ${id}
    `;

    await client.sql`COMMIT`;
    return result.rows;
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;
    console.error(
      "[ getCategories ]",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    await client.end();
  }
}

export async function getParts() {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();
    await client.sql`BEGIN`;

    const result = await client.sql`
      SELECT
        parts.*,
        COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'id', pricing.id,
              'price', pricing.price,
              'original_price', pricing.original_price,
              'id_related_part', pricing.id_related_part,
              'except_related_part', pricing.except_related_part
            )
          ) FILTER (WHERE pricing.id_part = parts.id),
          '[]'::jsonb
        ) AS pricing,
        COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'id', categories.id,
              'label', categories.label,
              'description', categories.description
            )
          ) FILTER (WHERE categories.id = parts.id_category),
          '[]'::jsonb
        ) AS category
      FROM
        parts
      LEFT JOIN
        categories ON parts.id_category = categories.id
      LEFT JOIN
        pricing ON parts.id = pricing.id_part
      GROUP BY
        parts.id
      ORDER BY
        parts.quantity_sold DESC
    `;

    await client.sql`COMMIT`;
    return result.rows;
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;
    console.error(
      "[ getParts ]",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    await client.end();
  }
}
