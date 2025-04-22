import express, { Request, Response } from 'express';
import supabase from '../supabaseClient';
// import '../types/express-session'
// import { SessionData } from 'express-session';

import 'express-session';  // Importing this will augment the types globally

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    accessToken?: string;
  }
}

const router = express.Router();

/**
 * @swagger
 * /api/user/getUsername:
 *   get:
 *     summary: Get the name of user
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error 
 */
router.get('/getUsername', async (req: Request, res: Response) => {
  const token = req.session.accessToken;

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  supabase.auth.getUser(token)
  .then(({ data, error }) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data.user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: data.user.user_metadata.display_name });
    }
  });
});

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
*                  type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/signup', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: username
      }
    }
  }).then(({ data, error }) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(201).json({ user: data });
    }
  });
});

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  supabase.auth.signInWithPassword({
    email,
    password
  }).then(({ data, error }) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      req.session.accessToken = data.session.access_token;
      req.session.userId = data.user.id;

      res.status(200).json({
        access_token: req.session.accessToken,
        user: req.session.userId
      });
    }
  });
});

export default router;
