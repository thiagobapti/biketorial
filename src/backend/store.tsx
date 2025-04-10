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
        json_build_object(
          'id', categories.id,
          'label', categories.label,
          'description', categories.description
        ) AS category
      FROM
        parts
      LEFT JOIN
        categories ON parts.id_category = categories.id
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
