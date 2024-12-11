var express = require('express');
var router = express.Router();
const { logInUser, signUpUser, getUserProfile } = require('../services/users');
const { authenticateJWT } = require('../services/middleware');

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Signup user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *           example:
 *             email: "newuser@example.com"
 *             password: "password123"
 *             name: "New User"
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Bad request
 *     security: []
 */
router.post('/signup', async (req, res) => {
  try {
    const result = await signUpUser(req.body);
    res.status(201).json({ result: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *           example:
 *             email: "existinguser@example.com"
 *             password: "password123"
 *             name: "John Doe"
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request
 *     security: []
 */
router.post('/login', async (req, res) => {
  try {
    const user = await logInUser(req.body);
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Get authenticated user's profile
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *             example:
 *               email: "user@example.com"
 *               name: "John Doe"
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *     security:
 *       - bearerAuth: []
 */
router.get('/profile', authenticateJWT, (req, res) => {
  getUserProfile(req.user.email, (err, user) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    res.json(user);
  });
});

module.exports = router;
