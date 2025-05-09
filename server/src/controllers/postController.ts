import { Request, Response } from 'express';

import supabase, { createSupabaseClient } from '../supabaseClient';
import { generatePublicUrl } from '../utils/publicUrlGenerator';
import { getUser } from '../utils/userGetter';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, content, room_id } = req.body;
  const imageFile = req.file;
  const user_id = req.cookies.userId;

  if (!title || room_id === undefined) {
    res.status(400).json({ error: 'Missing required fields: title, room' });
    return;
  }

  const supabase = createSupabaseClient(req.cookies.accessToken);
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
        let profilePicture;

        try {
          const user = await getUser(post.user_id);
          if (!user) {
            throw new Error('User not found');
          }
          username = user.username;
          profilePicture = user.profilePicture;

        } catch (err) {
          console.error('Error fetching username:', err);
        } finally {
          const imageUrl = post.image
            ? generatePublicUrl('post-image', post.image)
            : null;

          post.imageUrl = imageUrl;
        }
        return { ...post, username, profilePicture, imageUrl: post.imageUrl };
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
    let profilePicture;
    try {
      const user = await getUser(post.user_id);
      if (!user) {
        throw new Error('User not found');
      }
      username = user.username;
      profilePicture = user.profilePicture;
    } catch (err) {
      console.error('Error fetching username:', err);
    } finally {
      const imageUrl = post.image
        ? generatePublicUrl('post-image', post.image)
        : null;
      post.imageUrl = imageUrl;
    }
    res.status(200).json({ data: { ...post, username, profilePicture, imageUrl: post.imageUrl } });
  } catch (err) {
    console.error('Error decorating post:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const getPostsOfUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.cookies.userId;
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  try {
    const decoratedPosts = await Promise.all(
      posts.map(async (post) => {
        let username;
        let profilePicture;

        try {
          const user = await getUser(post.user_id);

          if (!user) {
            throw new Error('User not found');
          }

          username = user.username;
          profilePicture = user.profilePicture;
        } catch (err) {
          console.error('Error fetching username:', err);
        } finally {
          const imageUrl = post.image
            ? generatePublicUrl('post-image', post.image)
            : null;

          post.imageUrl = imageUrl;
        }
        return { ...post, username, profilePicture, imageUrl: post.imageUrl };
      })
    );

    res.status(200).json({ data: decoratedPosts });
  } catch (err) {
    console.error('Error decorating posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;
  const userId = req.cookies.userId;

  const supabase = createSupabaseClient(req.cookies.accessToken);

  // Check if the post exists
  const { data: post, error: fetchError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (fetchError) {
    res.status(400).json({ error: fetchError.message });
    return;
  }

  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  // Check if the user is the owner of the post
  if (post.user_id !== userId) {
    res.status(403).json({ error: 'Post Deletion Unauthorized' });
    return;
  }

  // Delete Image
  if (post.image) {
    const { error: deleteImageError } = await supabase.storage
      .from('post-image')
      .remove([post.image]);
      
    if (deleteImageError) {
      res.status(400).json({ error: deleteImageError.message });
      return;
    }
  }

  // Delete the post
  const { error: deleteError } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (deleteError) {
    res.status(400).json({ error: deleteError.message });
    return;
  }

  res.status(200).json({ message: 'Post deleted successfully' });
}
