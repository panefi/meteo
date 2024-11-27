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
 *     responses:
 *       200:
 *         description: User signed up
 *       400:
 *         description: Bad request
 */
router.post('/signup', async(req, res) => {
  try {
    const result = await signUpUser(req.body);
    res.status(201).json({"result": "Acount created successfully"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
})


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Login user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Bad request
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
