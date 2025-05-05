import express from 'express';
import asyncHandler from '../utils/asyncHandler'; // import the async handler
import { getAllRooms, getRoomById } from '../controllers/roomController';

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

/**
 * @swagger
 * /api/room/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the room to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved room
 */
router.get('/:id', asyncHandler(getRoomById));

export default router;
