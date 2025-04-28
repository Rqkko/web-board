import { Request, Response } from 'express';
import supabase from '../supabaseClient';

// ✅ Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, body, image, user, room } = req.body;

  if (!title || !user || room === undefined) {
    res.status(400).json({ error: 'Missing required fields: title, user, room' });
    return;
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, body, image, user, room }])
    .select();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(201).json({ message: 'Post created successfully', post: data?.[0] });
};

// ✅ Get all posts in a room
export const getPostsInRoom = async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('room', roomId)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
};

// ✅ Search posts across all rooms
export const searchPosts = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.query as string;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .ilike('title', `%${query}%`) // ilike = case-insensitive search
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
};

// ✅ Search posts inside a specific room
export const searchPostsInRoom = async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;
  const query = req.query.query as string;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('room', roomId)
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
};
