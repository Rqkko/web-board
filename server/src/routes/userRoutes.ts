import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/user/getName:
 *   get:
 *     summary: Get the name of user
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 */
router.get('/getName', (req, res) => {
  res.json({ message: "Rakko"});
});

/**
 * @swagger
 * /api/user/createAccount:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
// router.post('/createAccount', (req, res) => {
//   // TODO
// });

export default router;
