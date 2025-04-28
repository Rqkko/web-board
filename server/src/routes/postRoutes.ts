import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/post/getPosts:
 *   get:
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 */
router.get('/getPosts', (req, res) => {
  res.json({ message: 'Just pretend this is a post' });
});

/**
 * @swagger
 * /api/post/room/{roomId}:
 *   get:
 *     summary: Get all posts in a room
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved posts in a room
 */
router.get('/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  res.json({ message: `Just pretend these are posts in room ${roomId}` });
});

/**
 * @swagger
 * /api/post/search:
 *   get:
 *     summary: Search posts across all rooms
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved search results for posts
 */
router.get('/search', (req, res) => {
  const query = req.query.query;
  res.json({ message: `Just pretend we searched for ${query} across all posts` });
});

/**
 * @swagger
 * /api/post/room/{roomId}/search:
 *   get:
 *     summary: Search posts on a room
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: query
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved search results for posts in the specified room
 */
router.get('/room/:roomId/search', (req, res) => {
  const { roomId } = req.params;
  const query = req.query.query;
  res.json({ message: `Just pretend we searched for ${query} in room ${roomId}` });
});

/**
 * @swagger
 * /api/post/createPost:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               image:
 *                 type: string
 *               user:
 *                 type: string
 *               room:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post('/createPost', (req, res) => {
  const { title, body, image, user, room } = req.body;
  
  if (!title || !user || room === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  res.status(201).json({ message: 'Post created successfully', post: { title, body, image, user, room } });
});

export default router;
