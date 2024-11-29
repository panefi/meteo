var express = require('express');
var router = express.Router();
const { logInUser, signUpUser } = require('../services/users');

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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *           example:
 *             username: "newuser"
 *             password: "password123"
 *             email: "newuser@example.com"
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Bad request
 *     security: []
 */
router.post('/signup', async(req, res) => {
  try {
    const result = await signUpUser(req.body);
    res.status(201).json({"result": "Account created successfully"});
  } catch (error) {
    res.status(500).json({ error: error });
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
router.post('/login', async(req, res) => {
  try {
      const result = await logInUser(req.body);
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: error });
  }
});

module.exports = router;
