// import axios from 'axios';

// interface RegistrationData {
//   email: string;
//   password: string;
//   name: string;
// }

// export const registerUser = async (userData: RegistrationData) => {
//   try {
//     const response = await axios.post('http://localhost:3000/register', userData, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
    
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Handle specific axios error
//       throw new Error(error.response?.data?.message || 'Registration failed');
//     }
//     // Handle generic error
//     throw new Error('An unexpected error occurred');
//   }
// };

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // This is mock data - will be replaced with real API later
    const mockUser = {
      id: 1,
      email: "demo@gmail.com",
      name: "demo",
      is_verified: false,
    };

    return NextResponse.json(
      { message: "Registration successful", user: mockUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}