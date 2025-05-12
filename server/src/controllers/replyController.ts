import { Request, Response } from 'express';
import supabase, { createSupabaseClient } from '../supabaseClient';
import { getUser } from '../utils/userGetter';

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
        let profilePicture;

        try {
          const user = await getUser(reply.user_id);

          if (!user) {
            throw new Error('User not found');
          }

          username = user.username;
          profilePicture = user.profilePicture;
        } catch (err) {
          console.error('Error fetching username:', err);
        }
        return { ...reply, username, profilePicture };
      })
    );

    res.status(200).json({ data: decoratedPosts });
  } catch (err) {
    console.error('Error decorating posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};
