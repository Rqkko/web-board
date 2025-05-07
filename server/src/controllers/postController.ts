import { Request, Response } from 'express';
import supabase from '../supabaseClient';
import { generatePublicUrl } from '../utils/publicUrlGenerator';

async function getUsername(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('users')
    .select('username')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching username:', error.message);
    return null;
  }

  return data?.username || null;
}

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

export const getPosts = async (_: Request, res: Response): Promise<void> => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  try {
    const decoratedPosts = await Promise.all(
      posts.map(async (post) => {
        let username;

        try {
          username = await getUsername(post.user_id) || 'Unknown User';
        } catch (err) {
          console.error('Error fetching username:', err);
        } finally {
          const imageUrl = post.image
            ? generatePublicUrl('post-image', post.image)
            : null;

          post.imageUrl = imageUrl;
        }
        return { ...post, username, imageUrl: post.imageUrl };
      })
    );

    res.status(200).json({ data: decoratedPosts });
  } catch (err) {
    console.error('Error decorating posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  try {
    let username;
    try {
      username = await getUsername(post.user_id) || 'Unknown User';
    } catch (err) {
      console.error('Error fetching username:', err);
    } finally {
      const imageUrl = post.image
        ? generatePublicUrl('post-image', post.image)
        : null;
      post.imageUrl = imageUrl;
    }
    res.status(200).json({ data: { ...post, username, imageUrl: post.imageUrl } });
  } catch (err) {
    console.error('Error decorating post:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const getPostsInRoom = async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  try {
    const decoratedPosts = await Promise.all(
      posts.map(async (post) => {
        let username;

        try {
          username = await getUsername(post.user_id) || 'Unknown User';
        } catch (err) {
          console.error('Error fetching username:', err);
        } finally {
          const imageUrl = post.image
            ? generatePublicUrl('post-image', post.image)
            : null;

          post.imageUrl = imageUrl;
        }
        console.log('username:', username);
        return { ...post, username, imageUrl: post.imageUrl };
      })
    );

    res.status(200).json({ data: decoratedPosts });
  } catch (err) {
    console.error('Error decorating posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const searchPosts = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.query as string;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .ilike('title', `%${query}%`) // ilike = case-insensitive search
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  try {
    const decoratedPosts = await Promise.all(
      posts.map(async (post) => {
        let username;

        try {
          username = await getUsername(post.user_id) || 'Unknown User';
        } catch (err) {
          console.error('Error fetching username:', err);
        } finally {
          const imageUrl = post.image
            ? generatePublicUrl('post-image', post.image)
            : null;

          post.imageUrl = imageUrl;
        }
        console.log('username:', username);
        return { ...post, username, imageUrl: post.imageUrl };
      })
    );

    res.status(200).json({ data: decoratedPosts });
  } catch (err) {
    console.error('Error decorating posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const searchPostsInRoom = async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;
  const query = req.query.query as string;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('room_id', roomId)
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  try {
    const decoratedPosts = await Promise.all(
      posts.map(async (post) => {
        let username;

        try {
          username = await getUsername(post.user_id) || 'Unknown User';
        } catch (err) {
          console.error('Error fetching username:', err);
        } finally {
          const imageUrl = post.image
            ? generatePublicUrl('post-image', post.image)
            : null;

          post.imageUrl = imageUrl;
        }
        console.log('username:', username);
        return { ...post, username, imageUrl: post.imageUrl };
      })
    );

    res.status(200).json({ data: decoratedPosts });
  } catch (err) {
    console.error('Error decorating posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};
