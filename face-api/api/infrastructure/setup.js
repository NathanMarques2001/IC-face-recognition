const fs = require('fs');
const path = require('path');
const pgPromise = require('pg-promise')();
require('dotenv').config();

const db = pgPromise({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const setupFilePath = path.join(__dirname, 'setup.sql');
const sql = fs.readFileSync(setupFilePath, 'utf8');

console.log('Criando tabelas...');

db.query(sql)
  .then(() => {
    console.log('Tabelas criadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao criar tabelas:', error);
  });
