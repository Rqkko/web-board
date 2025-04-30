import express from 'express';
import asyncHandler from '../utils/asyncHandler'; // import the async handler
import { getAllRooms } from '../controllers/roomController';

const router = express.Router();

/**
 * @swagger
 * /api/room:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Successfully retrieved rooms
 */
router.get('/', asyncHandler(getAllRooms));

export default router;
