import { Router } from 'express';
import { createReply, getReplies } from '../controllers/replyController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

/**
 * @swagger
 * /api/reply/{postId}:
 *   post:
 *     summary: Create a reply to a post
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to reply to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reply created successfully
 *       400:
 *         description: Bad request
 */
router.post('/:postId', asyncHandler(createReply));

/**
 * @swagger
 * /api/reply/{postId}:
 *   get:
 *     summary: Get all replies for a post
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to get replies for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved replies
 *       400:
 *         description: Bad request
 */
router.get('/:postId', asyncHandler(getReplies));

export default router;