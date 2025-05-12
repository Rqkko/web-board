import express from 'express';
import multer from 'multer';

import asyncHandler from '../utils/asyncHandler';
import { createPost, deletePost, getPostById, getPosts, getPostsOfUser } from '../controllers/postController';

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
router.post('/createPost', upload.single('image'), asyncHandler(createPost));

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
 * /api/post/user/:
 *   get:
 *     summary: Get all posts of a user
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 */
router.get('/user', asyncHandler(getPostsOfUser));

/**
 * @swagger
 * /api/post/{postId}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved post
 */
router.get('/:postId', asyncHandler(getPostById));

/**
 * @swagger
 * /api/post/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted post
 */
router.delete('/:postId', asyncHandler(deletePost))

export default router;
