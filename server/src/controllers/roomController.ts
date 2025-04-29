import { Request, Response } from 'express';
import supabase from '../supabaseClient';

// ✅ getAllRooms: Returns Promise<void>, not Response
export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from('rooms').select('*');

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
};
