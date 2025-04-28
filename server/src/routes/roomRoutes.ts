import express from 'express';
import asyncHandler from '../utils/asyncHandler'; // import the async handler
import { getAllRooms, getPostsInRoom } from '../controllers/roomController';

const router = express.Router();

/**
 * @swagger
 * /api/room:
 *   get:
 *     summary: Get all rooms
 */
router.get('/', asyncHandler(getAllRooms));

/**
 * @swagger
 * /api/post/room/{roomId}:
 *   get:
 *     summary: Get all posts in a room
 */
router.get('/room/:roomId', asyncHandler(getPostsInRoom));

export default router;
