import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock validation - replace with real authentication later
    if (email === "demo@gmail.com" && password === "strongpassword123") {
      return NextResponse.json(
        {
          message: "Login successful",
          user: {
            id: 1,
            email: "demo@gmail.com",
            name: "Demo User",
            is_verified: false,
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}