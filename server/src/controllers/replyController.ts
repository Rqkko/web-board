import { Request, Response } from 'express';
import supabase, { createSupabaseClient } from '../supabaseClient';
import { getUsername } from '../utils/usernameGetter';

export const createReply = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body;
  const postId = req.params.postId;
  const userId = req.cookies.userId;
  const token = req.cookies.accessToken;

  const supabase = createSupabaseClient(token);

  const { data, error } = await supabase
    .from('replies')
    .insert([{ content, post_id: postId, user_id: userId }]);

  if (error) {
    console.log('Error inserting reply:', error);
    res.status(400).json({ error: error.message })
    return;
  }

  res.status(201).json({ message: 'Reply added successfully', data });
};

export const getReplies = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.postId;

  const { data: replies, error } = await supabase
    .from('replies')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false});

  if (error) {
    res.status(400).json({ error: error.message })
    return;
  }

  try {
    const decoratedPosts = await Promise.all(
      replies.map(async (reply) => {
        let username;

        try {
          username = await getUsername(reply.user_id) || 'Unknown User';
        } catch (err) {
          console.error('Error fetching username:', err);
        }
        console.log('username:', username);
        return { ...reply, username };
      })
    );

    res.status(200).json({ data: decoratedPosts });
  } catch (err) {
    console.error('Error decorating posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};
