import { Request, Response } from 'express';
import supabase from '../supabaseClient';

// export const createReply = async (req: Request, res: Response) => {
//   const { content } = req.body;
//   const postId = req.params.postId;
//   // const userId = req.user.id;

//   const { data, error } = await supabase
//     .from('replies')
//     .insert([{ content, post_id: postId, user_id: userId }]);

//   if (error) return res.status(400).json({ error: error.message });

//   res.status(201).json({ message: 'Reply added successfully', data });
// };

export const getReplies = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  const { data, error } = await supabase
    .from('replies')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false});

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ data });
};
