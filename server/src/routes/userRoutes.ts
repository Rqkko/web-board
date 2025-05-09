import express, { Request, Response } from 'express';
import multer from 'multer';

import supabase from '../supabaseClient';
import { getUser } from '../utils/userGetter';

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * /api/user/getEmail:
 *   get:
 *     summary: Get the email of user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved email
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error 
 */
router.get('/getEmail', (req: Request, res: Response) => {
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
      res.status(200).json({ message: data.user.email });
    }
  });
});

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
 * /api/user/getSessionUser:
 *   get:
 *     summary: Get the session user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved session user
 *       404:
 *         description: User not found
 */
router.get('/getSessionUser', async (req: Request, res: Response) => {
  const userId = req.cookies.userId;

  if (!userId) {
    res.status(401).json({ error: 'User Not Logged In' });
    return;
  }

  const user = await getUser(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const { username, profilePicture } = user;

  res.status(200).json({ username, profilePicture });
})

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       404:
 *         description: User not found
 */
router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId) {
    res.status(401).json({ error: 'User Not Logged In' });
    return;
  }

  const user = await getUser(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const { username, profilePicture } = user;

  res.status(200).json({ username, profilePicture });
})


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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post created successfully
 */
router.post('/signup', upload.single('profile_picture'), async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const imageFile = req.file;
  console.log("Image file:", imageFile);

  supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: username,
      }
    }
  }).then(async ({ data, error }) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else if (!data || !data.session || !data.user) {
      res.status(400).json({ error: 'User creation failed' });
    } else {
      // Successfully created user
      let imagePath: string | null = null;
      if (imageFile) {
        const strippedUsername = username.replace(/\s+/g, '');
        const fileName = `${strippedUsername}-${Date.now()}.jpg`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile-pictures')
          .upload(fileName, imageFile.buffer, {
            contentType: imageFile.mimetype,
          });

        if (uploadError) {
          res.status(400).json({ error: uploadError.message });
          return;
        }

        imagePath = uploadData?.path;
        console.log('Profile picture to:', imagePath);
      }
      
      const { error: insertError } = await supabase.from('users').insert({
        id: data.user.id,
        username: username,
        profile_picture: imagePath
      });

      if (insertError) {
        res.status(400).json({ error: insertError.message });
        return;
      }

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
      res.cookie('email', data.user.email, {
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
