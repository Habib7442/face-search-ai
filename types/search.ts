export interface SearchResult {
    adultContent: boolean;
    group: number;
    sourceUrl: string;
    imageUrl: string;
  }
  
  export interface ProcessedData {
    status: string;
    user_email: string;
    is_premium: boolean;
    
      
    data: SearchResult[];
    
  }