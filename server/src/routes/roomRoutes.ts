// src/routes/roomRoutes.ts

import { Router, Request, Response } from 'express';
import supabase from '../supabaseClient';

const router = Router();

// GET /api/room → Get all rooms
router.get('/', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('rooms').select('*').order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ data });
});

export default router;
