"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * /api/post/getPosts:
 *   get:
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 */
router.get('/getPosts', (req, res) => {
    res.json({ message: 'Just pretend this is a post' });
});
// router.post('/', createPost);
exports.default = router;
