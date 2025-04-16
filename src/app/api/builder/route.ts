import { NextRequest, NextResponse } from "next/server";
import { getGroupedParts } from "@/backend/store";

export async function GET(request: NextRequest) {
  try {
    const result = await getGroupedParts(
      undefined,
      "b1ac25e7-90e1-463b-9efd-fe075da00ea3"
    );

    return NextResponse.json({
      id: "b1ac25e7-90e1-463b-9efd-fe075da00ea3",
      categories: result,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
