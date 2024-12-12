// // In your route handler file (e.g., route.ts)
// import { ProcessedData } from "@/types/search";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { image, adultFilter } = body;
//     console.log(adultFilter);

//     if (!image) {
//       return NextResponse.json({ error: "Missing image" }, { status: 400 });
//     }

//     // Simulated processing logic
//     const processedData: ProcessedData = {
//       status: "success",
//       user_email: "webtech076@gmail.com",
//       is_premium: false,

//       data: [
//         {
//           adultContent: true,
//           group: 0,
//           sourceUrl: "FacesearchAI",
//           imageUrl: "https://cdn.editorji.com/R215Cgr7fF.jpg",
//         },
//         {
//           adultContent: true,
//           group: 3,
//           sourceUrl: "FacesearchAI",
//           imageUrl:
//             "https://www.pinkvilla.com/images/2023-11/1698880802_shah-rukh-khan-birthday-message.jpg",
//         },
//         {
//           adultContent: true,
//           group: 4,
//           sourceUrl: "FacesearchAI",
//           imageUrl:
//             "https://cdn.manalokam.com/wp-content/uploads/2024/01/shahrukh-khan-421-1694248520.jpg",
//         },
//         {
//           adultContent: false,
//           group: 4,
//           sourceUrl: "FacesearchAI",
//           imageUrl:
//             "https://www.iwmbuzz.com/wp-content/uploads/2023/07/when-shah-rukh-khan-said-he-finds-his-stardom-shocking-watch-throwback-video.jpg",
//         },
//         {
//           adultContent: false,
//           group: 4,
//           sourceUrl: "FacesearchAI",
//           imageUrl:
//             "https://images.news18.com/ibnlive/uploads/2023/09/image-1200x900-2023-09-28t062044.328-2023-09-a164584397280386417f9cd9739f766a-3x2.png?impolicy=website&width=510&height=356",
//         },
//       ]
//         // By default, filter out adult content
//         // .filter((result) => !result.adultContent),
//         .filter((result) => adultFilter || !result.adultContent),
//     };

//     // Return the filtered results with all necessary information
//     return NextResponse.json({
//       results: processedData.data,
//       sourceUrl: processedData.data[0]?.sourceUrl || null,
//     });
//   } catch (error) {
//     console.error("Error processing image:", error);
//     return NextResponse.json(
//       { error: "Failed to process image" },
//       { status: 500 }
//     );
//   }
// }

import { ProcessedData } from "@/types/search";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token matches cookie
    const cookieStore = cookies();
    const storedToken = cookieStore.get("access_token")?.value;

    if (!storedToken || token !== storedToken) {
      return NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { image, adultFilter } = body;

    if (!image) {
      return NextResponse.json({ error: "Missing image" }, { status: 400 });
    }

    // Rest of your existing processing logic
    const processedData: ProcessedData = {
      status: "success",
      user_email: "webtech076@gmail.com",
      is_premium: false,
      data: [
        {
          adultContent: true,
          group: 0,
          sourceUrl: "FacesearchAI",
          imageUrl: "https://cdn.editorji.com/R215Cgr7fF.jpg",
        },
        {
          adultContent: true,
          group: 3,
          sourceUrl: "FacesearchAI",
          imageUrl:
            "https://www.pinkvilla.com/images/2023-11/1698880802_shah-rukh-khan-birthday-message.jpg",
        },
        {
          adultContent: true,
          group: 4,
          sourceUrl: "FacesearchAI",
          imageUrl:
            "https://cdn.manalokam.com/wp-content/uploads/2024/01/shahrukh-khan-421-1694248520.jpg",
        },
        {
          adultContent: false,
          group: 4,
          sourceUrl: "FacesearchAI",
          imageUrl:
            "https://www.iwmbuzz.com/wp-content/uploads/2023/07/when-shah-rukh-khan-said-he-finds-his-stardom-shocking-watch-throwback-video.jpg",
        },
        {
          adultContent: false,
          group: 4,
          sourceUrl: "FacesearchAI",
          imageUrl:
            "https://images.news18.com/ibnlive/uploads/2023/09/image-1200x900-2023-09-28t062044.328-2023-09-a164584397280386417f9cd9739f766a-3x2.png?impolicy=website&width=510&height=356",
        },
      ].filter((result) => adultFilter || !result.adultContent),
    };

    return NextResponse.json({
      results: processedData.data,
      sourceUrl: processedData.data[0]?.sourceUrl || null,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
