import express from 'express';

const router = express.Router();

router.get('/getPosts', (req, res) => {
  res.json({ message: 'Just pretend this is a post' });
});

// router.post('/', createPost);

export default router;
