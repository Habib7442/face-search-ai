import { NextResponse } from "next/server";

const PREMIUM_USERS = ["premium@example.com"];

const mockHistoryData = {
  status: "success",
  processed_url: "url",
  details: {
    uuid: "b57106e2-5256-40fd-a0c5-2569938117d8",
    uploadedImageBase64: "uploaded_image_base64",
    UST_time: "2024-11-12 14:24:08",
    results: [
      {
        adultContent: false,
        group: 0,
        sourceUrl: "FacesearchAI",
        imageUrl: "https://cdn.editorji.com/R215Cgr7fF.jpg"
      },
      {
        adultContent: false,
        group: 2,
        sourceUrl: "FacesearchAI",
        imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/shah-rukh-khan-bollywood-169389292816x9.jpg"
      },
      {
        adultContent: false,
        group: 3,
        sourceUrl: "FacesearchAI",
        imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883-16940928653x2.jpg"
      },
      {
        adultContent: true,
        group: 3,
        sourceUrl: "FacesearchAI",
        imageUrl: "https://www.pinkvilla.com/images/2023-11/1698880802_shah-rukh-khan-birthday-message.jpg"
      },
      {
        adultContent: false,
        group: 3,
        sourceUrl: "FacesearchAI",
        imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883-16940928653x2.jpg"
      },
      {
        adultContent: false,
        group: 4,
        sourceUrl: "FacesearchAI",
        imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883.jpg"
      }
    ]
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  if (!PREMIUM_USERS.includes(email)) {
    return NextResponse.json(
      { message: "Premium access required" },
      { status: 403 }
    );
  }

  return NextResponse.json(mockHistoryData, { status: 200 });
}