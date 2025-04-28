import express from 'express';
import asyncHandler from '../utils/asyncHandler'; // ✅ Import asyncHandler
import { createPost, getPostsInRoom, searchPosts, searchPostsInRoom } from '../controllers/postController'; // 👈 assume you have these controllers

const router = express.Router();

/**
 * @swagger
 * /api/post/createPost:
 *   post:
 *     summary: Create a new post
 */
router.post('/createPost', asyncHandler(createPost)); // ✅ WRAP IN asyncHandler

/**
 * @swagger
 * /api/post/room/{roomId}:
 *   get:
 *     summary: Get all posts in a room
 */
router.get('/room/:roomId', asyncHandler(getPostsInRoom)); // ✅ WRAP IN asyncHandler

/**
 * @swagger
 * /api/post/search:
 *   get:
 *     summary: Search posts across all rooms
 */
router.get('/search', asyncHandler(searchPosts)); // ✅ WRAP IN asyncHandler

/**
 * @swagger
 * /api/post/room/{roomId}/search:
 *   get:
 *     summary: Search posts in a specific room
 */
router.get('/room/:roomId/search', asyncHandler(searchPostsInRoom)); // ✅ WRAP IN asyncHandler

export default router;
