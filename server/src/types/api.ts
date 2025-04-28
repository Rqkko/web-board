// types/api.ts

export interface CreatePostRequest {
    title: string;
    body: string;
    image?: string;
    user: string;
    room: number;
  }
  
  export interface CreateReplyRequest {
    content: string;
  }
  