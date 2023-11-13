const { Pool } = require('pg');
require('dotenv').config();

console.log('Conectando ao banco de dados...');

const connection = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = connection;
