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
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
}


module.exports = {
    logInUser,
    signUpUser
}