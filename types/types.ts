export interface User {
    id: number;
    email: string;
    name: string;
    is_verified: boolean;
  }
  
  export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
  }

  export interface LoginFormData {
    email: string;
    password: string;
  }

  export interface HistoryResult {
    adultContent: boolean;
    group: number;
    sourceUrl: string;
    imageUrl: string;
  }
  
  export interface HistoryDetails {
    uuid: string;
    uploadedImageBase64: string;
    UST_time: string;
    results: HistoryResult[];
  }
  
  export interface HistoryResponse {
    id: string;
    timestamp: string;
    platform: string;
    result_count: number;
    search_results: Array<{
      id: string;
      url: string;
    }>;
  }