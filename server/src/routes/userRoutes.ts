import express, { Request, Response } from 'express';
import supabase from '../supabaseClient';

const router = express.Router();

/**
 * @swagger
 * /api/user/getUsername:
 *   get:
 *     summary: Get the name of user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error 
 */
router.get('/getUsername', (req: Request, res: Response) => {
  const token = req.cookies.accessToken;

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
 * /api/user/getUserId:
 *  get:
 *    summary: Get the ID of user
 *    tags: [Users]
 *    responses:
 *     200:
 *      description: Successfully retrieved user ID
 *     404:
 *      description: User not found
 */
router.get('/getUserId', (req: Request, res: Response) => {
  const userId = req.cookies.userId;
  if (!userId) {
    res.status(401).json({ error: 'No user ID provided' });
    return;
  }
  res.status(200).json({ message: userId });
});

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
    } else if (!data || !data.session || !data.user) {
      res.status(400).json({ error: 'User creation failed' });
    } else {
      res.cookie('accessToken', data.session.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000 // 1 hour
      });
      res.cookie('userId', data.user.id, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000 // 1 hour
      });
      res.status(201).json({ user: data });
    }
  });
});

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
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
      res.cookie('accessToken', data.session.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000 // 1 hour
      });
      res.cookie('userId', data.user.id, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000 // 1 hour
      });
      res.sendStatus(200);
    }
  });
});

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/logout', async (req: Request, res: Response) => {
  supabase.auth.signOut()
    .then(({ error }) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.clearCookie('accessToken');
        res.clearCookie('userId');
        res.sendStatus(200);
      }
    });
  }
);

export default router;
