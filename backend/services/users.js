const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../database/database');
const { GET_USER } = require('../database/queries/users');
const { UserModel } = require('../models/users');

const signUpUser = async (data) => {
    const { error } = UserModel.validate(data);
    if (error) throw new Error(error.message);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const result = await executeQuery(CREATE_USER, [data.email, hashedPassword, data.name]);
    return result;
}

const logInUser = async (data) => {
    const { error } = UserModel.validate(data);
    if (error) throw new Error(error.message);

    const user = await executeQuery(GET_USER, [data.email]);
    const isPasswordValid = await bcrypt.compare(data.password, user[0].password_hash);

    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Proceed with generating JWT
    const token = jwt.sign({ email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
}

function getUserProfile(email, callback) {
    executeQuery(GET_USER, [email], (err, results) => {
        if (err || results.length === 0) {
            return callback('User not found', null);
        }
        const user = results[0];
        callback(null, { email: user.email, name: user.name });
    });
}

module.exports = {
    logInUser,
    signUpUser,
    getUserProfile
}