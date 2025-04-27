import { Router } from 'express';
import { getReplies } from '../controllers/replyController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// router.post('/:postId', asyncHandler(createReply));
router.get('/:postId', asyncHandler(getReplies));

export default router;