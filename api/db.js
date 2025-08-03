const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'student',
  password: process.env.DB_PASSWORD || 'studentpass',
  database: process.env.DB_NAME || 'finalexam_db',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
