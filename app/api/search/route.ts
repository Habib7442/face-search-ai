import { ProcessedData } from "@/types/search";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, adultFilter } = body;

    if (!image) {
      return NextResponse.json({ error: "Missing image" }, { status: 400 });
    }

    // Simulated processing logic
    const processedData: ProcessedData = {
      status: "success",
      processed_url: "https://example.com/image.jpg",
      details: {
        uuid: "5555",
        uploadedImageBase64: image,
        UST_time: new Date().toISOString(),
        results: [
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
        ].filter((result) => !adultFilter || !result.adultContent),
      },
    };

    // Return the filtered results with all necessary information
    return NextResponse.json({
      results: processedData.details.results,
      sourceUrl: processedData.details.results[0]?.sourceUrl || null,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}