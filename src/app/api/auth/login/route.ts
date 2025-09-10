import { NextRequest, NextResponse } from "next/server";
import { login } from "../../auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await login({ body });
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        user: result.user,
        message: result.message
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal server error"
    }, { status: 500 });
  }
}
