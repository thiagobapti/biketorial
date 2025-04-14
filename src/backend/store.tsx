"use server";

import { createClient } from "@vercel/postgres";

import OpenAI from "openai";

export async function getGalleryData() {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();
    await client.sql`BEGIN`;

    const result = await client.sql`
      SELECT
        parts.id as id_part,
        parts."label",
        parts.base_price ,
        parts.price,
        parts.quantity_available,
        parts.quantity_sold,
        categories."label"  as category_label
      FROM
        parts
      LEFT JOIN
        categories ON parts.id_category = categories.id
      WHERE categories.id_category IS NULL
      GROUP BY
        parts.id,
        categories."label"
      ORDER BY
        parts.quantity_sold DESC
    `;

    await client.sql`COMMIT`;
    return result.rows;
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;
    console.error(
      "[ getGalleryData ]",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    await client.end();
  }
}
export async function getPartData(id: string) {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();
    await client.sql`BEGIN`;

    const result = await client.sql`
      SELECT
        parts.id as id_part,
        parts."label",
        parts.base_price ,
        parts.price,
        parts.quantity_available,
        parts.quantity_sold,
        categories."label"  as category_label
      FROM
        parts
      LEFT JOIN
        categories ON parts.id_category = categories.id
      WHERE
        parts.id = ${id}
      GROUP BY
        parts.id,
        categories."label"
      ORDER BY
        parts.quantity_sold DESC
    `;

    await client.sql`COMMIT`;
    return result.rows;
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;
    console.error(
      "[ getGalleryData ]",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    await client.end();
  }
}

export async function getCategories() {
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
      ORDER BY
        label
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

export async function getCategoryByPartId(id: string) {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();
    await client.sql`BEGIN`;

    const result = await client.sql`
      SELECT 
      categories.* 
      FROM 
        categories
      INNER JOIN
        parts ON parts.id_category = categories.id
      WHERE
        parts.id = ${id}
      ORDER BY
        categories.label
    `;

    await client.sql`COMMIT`;
    return result.rows[0] || [];
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;
    console.error(
      "[ getCategoryByPartId ]",
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
        parts.*
      FROM
        parts
      LEFT JOIN
        categories ON parts.id_category = categories.id
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

export async function getRelatedCategoriesAndParts(partId: string) {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  try {
    await client.connect();
    await client.sql`BEGIN`;

    const result = await client.sql`
      WITH target_category AS (
        SELECT id_category
        FROM parts
        WHERE id = ${partId}
      )
      SELECT 
        categories.*,
        json_agg(
          jsonb_build_object(
            'id', parts.id,
            'label', parts.label,
            'quantity_available', parts.quantity_available,
            'quantity_sold', parts.quantity_sold,
            'base_price', parts.base_price,
            'price', parts.price,
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
        ) as parts
      FROM 
        categories
      JOIN
        parts ON parts.id_category = categories.id
      WHERE
        categories.id_category = (SELECT id_category FROM target_category)
        AND categories.id <> (SELECT id_category FROM target_category)
      GROUP BY
        categories.id
      ORDER BY
        categories.label
    `;

    await client.sql`COMMIT`;
    return result.rows;
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;
    console.error(
      "[ getRelatedCategoriesAndParts ]",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    await client.end();
  }
}
