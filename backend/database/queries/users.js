GET_USER = 'SELECT * FROM users WHERE email = ?';
CREATE_USER = 'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)';

module.exports = {
    GET_USER,
    CREATE_USER
}
