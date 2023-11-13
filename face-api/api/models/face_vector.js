const connection = require('../infrastructure/connection');

class FaceVector {
  async getAll(req, res) {
    try {
      const result = await connection.query('SELECT * FROM facial_vectors');
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar vetores faciais:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async create(req, res) {
    const { user_id, face_vector } = req.body;
    try {
      const result = await connection.query('INSERT INTO facial_vectors (user_id, face_vector) VALUES ($1, $2) RETURNING *', [user_id, face_vector]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao criar vetor facial:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async calcularDistanciaEuclidiana(req, res) {
    const { userVector } = req.body;
    try {
      const result = await connection.query('SELECT calcular_distancia_euclidiana($1)', [userVector]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao calcular distância euclidiana:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new FaceVector();