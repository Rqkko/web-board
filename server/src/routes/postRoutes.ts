import express from 'express';
import multer from 'multer';
import asyncHandler from '../utils/asyncHandler'; // ✅ Import asyncHandler
import { createPost, getPosts, getPostsInRoom, searchPosts, searchPostsInRoom } from '../controllers/postController'; // 👈 assume you have these controllers

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * /api/post/createPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               content:
 *                 type: string
 *                 description: Body content of the post
 *               image:
 *                 type: string
 *                 format: binary
 *               room_id:
 *                 type: integer
 *                 description: ID of the room or category
 *     responses:
 *       200:
 *         description: Post created successfully
 */
router.post('/createPost', upload.single('image'), asyncHandler(createPost)); // ✅ WRAP IN asyncHandler

/**
 * @swagger
 * /api/post:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 */
router.get('/', asyncHandler(getPosts));

/**
 * @swagger
 * /api/post/room/{roomId}:
 *   get:
 *     summary: Get all posts in a room
 *     tags: [Posts]
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         description: ID of the room to get posts from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 */
router.get('/room/:roomId', asyncHandler(getPostsInRoom)); // ✅ WRAP IN asyncHandler

/**
 * @swagger
 * /api/post/search:
 *   get:
 *     summary: Search posts across all rooms
 *     tags: [Posts]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 */
router.get('/search', asyncHandler(searchPosts)); // ✅ WRAP IN asyncHandler

/**
 * @swagger
 * /api/post/room/{roomId}/search:
 *   get:
 *     summary: Search posts in a specific room
 *     tags: [Posts]
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         description: ID of the room to search in
 *         schema:
 *           type: string
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 */
router.get('/room/:roomId/search', asyncHandler(searchPostsInRoom)); // ✅ WRAP IN asyncHandler

export default router;
