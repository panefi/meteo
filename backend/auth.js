const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const { executeQuery } = require('./database/database');
const { GET_USER, CREATE_USER, GET_USER_BY_ID } = require('./database/queries/users');
const jwt = require('jsonwebtoken');

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    const results = await executeQuery(GET_USER, [email]);

    if (results.length > 0) {
      return done(null, results[0]);
    } else {
      const newUser = {
        email: email,
        name: profile.displayName,
      };

      const insertResult = await executeQuery(CREATE_USER, [newUser.email, newUser.name]);
      newUser.id = insertResult.insertId;
      return done(null, newUser);
    }
  } catch (error) {
    console.error('Error processing Google callback:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const results = await executeQuery(GET_USER_BY_ID, [id]);
    console.log(results);
    if (results.length > 0) {
      done(null, results[0]);
    } else {
      done(new Error('User not found'), null);
    }
  } catch (error) {
    done(error, null);
  }
});

// Example of generating a JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
  generateToken,
}; 