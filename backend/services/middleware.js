const jwt = require('jsonwebtoken');

// Middleware to authenticate using JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader); // Log the header

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = {
  authenticateJWT,
};