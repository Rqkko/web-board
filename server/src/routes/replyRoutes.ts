import { Router } from 'express';
import { createReply, getReplies } from '../controllers/replyController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/:postId', authenticateUser, createReply);
router.get('/:postId', getReplies);

export default router;