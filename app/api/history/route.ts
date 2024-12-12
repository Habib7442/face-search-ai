import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

const PREMIUM_USERS = ["premium@example.com"];

const mockHistoryData = {
  id: "4ac2cb8e-3f10-4167-98de-e26051ab2311",
  query: "https://cdn.editorji.com/R215Cgr7fF.jpg",
  result_count: 212,
  timestamp: "2024-12-12T09:57:22.115346",
  platform: "web",
  search_results: [
    {
      adultContent: false,
      group: 0,
      sourceUrl: "FacesearchAI",
      imageUrl: "https://cdn.editorji.com/R215Cgr7fF.jpg",
    },
    {
      adultContent: false,
      group: 2,
      sourceUrl: "FacesearchAI",
      imageUrl:
        "https://images.news18.com/ibnlive/uploads/2023/09/shah-rukh-khan-bollywood-169389292816x9.jpg",
    },
    {
      adultContent: false,
      group: 3,
      sourceUrl: "FacesearchAI",
      imageUrl:
        "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883-16940928653x2.jpg",
    },
    {
      adultContent: true,
      group: 3,
      sourceUrl: "FacesearchAI",
      imageUrl:
        "https://www.pinkvilla.com/images/2023-11/1698880802_shah-rukh-khan-birthday-message.jpg",
    },
    {
      adultContent: false,
      group: 3,
      sourceUrl: "FacesearchAI",
      imageUrl:
        "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883-16940928653x2.jpg",
    },
    {
      adultContent: false,
      group: 4,
      sourceUrl: "FacesearchAI",
      imageUrl:
        "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883.jpg",
    },
  ],
};

export async function GET(request: Request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    
    // Verify token matches cookie
    const cookieStore = cookies();
    const storedToken = cookieStore.get('access_token')?.value;

    if (!storedToken || token !== storedToken) {
      return NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    if (!PREMIUM_USERS.includes(email)) {
      return NextResponse.json(
        { message: "Premium access required" },
        { status: 403 }
      );
    }

    return NextResponse.json(mockHistoryData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
