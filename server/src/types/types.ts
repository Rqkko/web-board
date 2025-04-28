// types/types.ts

export type Post = {
    id: number;
    title: string;
    body?: string;
    image?: string;
    user: string; // UUID
    room: number;
    created_at: string;
  };
  
  export type Reply = {
    id: number;
    content: string;
    post_id: number;
    user_id: string;
    created_at: string;
  };
  
  export type Room = {
    id: number;
    name: string;
    created_at: string;
  };
  