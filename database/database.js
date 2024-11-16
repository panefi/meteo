const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


async function executeQuery(query, params = []) {
    if (!pool) {
        throw new Error('Database connection not established');
    }
    const [rows, fields] = await pool.execute(query, params);
    return rows;
}

module.exports = { executeQuery };
