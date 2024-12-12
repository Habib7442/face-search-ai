import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock validation - replace with real authentication later
    if (email === "demo@gmail.com" && password === "123456") {
      // Mock token response - replace with your actual token later
      const mockTokenResponse = {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3ZWJ0ZWNoMDc2QGdtYWlsLmNvbSIsImV4cCI6MTczMzk5OTA2Mn0.fptNY6Yd-jzymCTShXEcb4W4LJLdkPccG4o3adEVScA",
        token_type: "bearer"
      };

      const thirtyMinutes = 30 * 60;

      // Set the HTTP-only cookie
      cookies().set('access_token', mockTokenResponse.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: thirtyMinutes, // 1 week
        path: '/',
      });

      // Set a non-HTTP-only cookie for client access
      cookies().set('client_token', mockTokenResponse.access_token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: thirtyMinutes,
        path: '/',
      });

      // Return the user data without the token in the response body
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
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}