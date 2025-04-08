import { NextRequest, NextResponse } from "next/server";
import { build } from "@/backend/builder";

export async function POST(request: NextRequest) {
  try {
    const result = await build();

    if (!result.success) {
      throw new Error(result.error || "Failed to generate content");
    }

    return NextResponse.json(result);
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
