import { Request, Response } from 'express';
import supabase from '../supabaseClient';

export const getAllRooms = async (_: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from('rooms').select('*');

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { data, error } = await supabase.from('rooms').select('*').eq('id', id).single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
}
