import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "../../session";

export async function POST(request: NextRequest) {
  try {
    const result = await deleteSession();

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: "Logged out successfully" 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "Failed to logout" 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error during logout" 
      }, 
      { status: 500 }
    );
  }
}
