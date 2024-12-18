import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the authentication cookie
    response.cookies.delete("client_token");

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to logout" },
      { status: 500 }
    );
  }
} 