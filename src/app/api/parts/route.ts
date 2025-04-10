import { NextRequest, NextResponse } from "next/server";
import { getParts } from "@/backend/store";

export async function GET(request: NextRequest) {
  try {
    const result = await getParts();

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
