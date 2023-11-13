const connection = require('../infrastructure/connection');

class User {
  async getAll(req, res) {
    try {
      const result = await connection.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async get(req, res) {
    try {
      const id = req.params.id;
      const result = await connection.query('SELECT * FROM users WHERE id = \$1', [id]);
      if (result.rowCount > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async create(req, res) {
    const { name } = req.body;
    try {
      const result = await connection.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new User();