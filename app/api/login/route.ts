import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Your existing authentication logic
    if (email === "demo@gmail.com" && password === "123456") {
      const thirtyMinutes = 30 * 60;

      // Generate your access token as before
      const mockTokenResponse = {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        token_type: "bearer",
      };

      // Set your existing cookies
      cookies().set("access_token", mockTokenResponse.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: thirtyMinutes,
        path: "/",
      });

      cookies().set("client_token", mockTokenResponse.access_token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: thirtyMinutes,
        path: "/",
      });

      return NextResponse.json(
        {
          message: "Login successful",
          user: {
            id: 1,
            email: "demo@gmail.com",
            name: "Demo User",
            isVerified: false,
          },
          expiresIn: thirtyMinutes,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
