
import { NextRequest, NextResponse } from "next/server";
import { register } from "../../auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await register({ body });

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
