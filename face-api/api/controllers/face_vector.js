const FaceVector = require('../models/face_vector');

module.exports = (app) => {
  app.get('/facial-vectors', async (req, res) => {
    await FaceVector.getAll(req, res);
  });

  app.post('/facial-vectors', async (req, res) => {
    await FaceVector.create(req, res);
  });

  app.post('/facial-vectors/calcular-distancia-euclidiana', async (req, res) => {
    await FaceVector.calcularDistanciaEuclidiana(req, res);
  });
}