// app/api/get-info/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrls } = await request.json();

    // Validate input
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Search results as specified
    const search_results = [
      {
        "adultContent": false,
        "group": 0,
        "sourceUrl": "FacesearchAI",
        "imageUrl": "https://www.entrepreneurindia.com/assets/img/team2023/tanmay-bhat.jpg"
      },
      {
        "adultContent": false,
        "group": 3,
        "sourceUrl": "FacesearchAI",
        "imageUrl": "https://filmywiki.org/wp-content/uploads/2023/09/Tanmay-Bhat.png"
      },
      {
        "adultContent": false,
        "group": 3,
        "sourceUrl": "FacesearchAI",
        "imageUrl": "https://www.moneyhaat.com/wp-content/uploads/2024/04/kcarjfv_tanmay-bhat_625x300_14_February_23.jpg"
      },
      {
        "adultContent": false,
        "group": 3,
        "sourceUrl": "FacesearchAI",
        "imageUrl": "https://img-cdn.thepublive.com/fit-in/580x326/filters:format(webp)/socialketchup/media/media_files/WNvpFT3tzrdAKATCtROb.png"
      }
    ];

    // Result generation based on the search results
    const result = {
      "Full Name": "Tanmay Bhat",
      "Topics": [
        "Comedy Career: How has the journey in stand-up comedy evolved?",
        "Digital Content: Future of comedy and content creation",
        "AIB and Beyond: Reflections on the comedy collective and personal growth"
      ],
      "More Information": "Tanmay Bhat is a prominent Indian comedian, content creator, and former member of the comedy group AIB (All India Bakchod). Known for his bold comedy style and digital content, he has been a significant influencer in the Indian comedy scene, navigating through various challenges and transformations in the entertainment industry.",
      "Confidential Analysis Score": "82/100",
      "Poem": "A mic, a stage, a jest so bright,\nTanmay Bhat, comedy's guiding light.\nFrom AIB's roar to digital's embrace,\nLaughter and truth in every space.\nBold words that challenge, humor that ignites,\nA comedian who soars to creative heights."
    };

    return NextResponse.json({ 
      result, 
      search_results 
    }, { status: 200 });
  } catch (error) {
    console.error('Error in get-info route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}