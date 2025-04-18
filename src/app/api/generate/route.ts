import { NextRequest, NextResponse } from "next/server";
import { build } from "@/backend/builder";

export async function POST(request: NextRequest) {
  try {
    const prompt =
      "A realistic photo of a moss green step-through bicycle with a very low or absent top tube, designed for easy mounting. Full side view, professional photo studio with solid vibrant pink-red background (#ff2450), minimalist and clean";

    const result = await build(prompt);

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
