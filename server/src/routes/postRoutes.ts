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

// router.post('/', createPost);

export default router;
