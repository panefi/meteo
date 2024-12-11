GET_USER = 'SELECT * FROM users WHERE email = ?';
CREATE_USER = 'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)';
GET_USER_BY_ID = 'SELECT * FROM users WHERE id = ?';

module.exports = {
    GET_USER,
    CREATE_USER,
    GET_USER_BY_ID
}
