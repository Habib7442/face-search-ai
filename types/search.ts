export interface SearchResult {
    adultContent: boolean;
    group: number;
    sourceUrl: string;
    imageUrl: string;
  }
  
  export interface ProcessedData {
    status: string;
    processed_url: string;
    details: {
      uuid: string;
      uploadedImageBase64: string;
      UST_time: string;
      results: SearchResult[];
    };
  }