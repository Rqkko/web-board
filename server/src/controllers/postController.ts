import { Request, Response } from 'express';
import supabase from '../supabaseClient';

// ✅ Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, content, room_id } = req.body;
  const imageFile = req.file;
  const user_id = req.cookies.userId;

  console.log("Received data:", req.body);
  console.log('Received file:', imageFile);

  if (!title || room_id === undefined) {
    res.status(400).json({ error: 'Missing required fields: title, room' });
    return;
  }

  let imagePath: string | null = null;

  // Upload image (if provided)
  if (imageFile) {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('post-image')
      .upload(fileName, imageFile.buffer, {
        contentType: imageFile.mimetype,
      });

    if (uploadError) {
      res.status(400).json({ error: uploadError.message });
      return;
    }

    imagePath = uploadData?.path;
    console.log('Image uploaded to:', imagePath);
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{ user_id, room_id, title, content, image: imagePath }])
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
    .eq('room_id', roomId)
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
    .eq('room_id', roomId)
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
};
