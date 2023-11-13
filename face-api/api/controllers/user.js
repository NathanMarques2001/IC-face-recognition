const User = require('../models/user');

module.exports = (app) => {
  app.get('/users', async (req, res) => {
    await User.getAll(req, res);
  });

  app.get('/users/:id', async (req, res) => {
    await User.get(req, res);
  });

  app.post('/users', async (req, res) => {
    await User.create(req, res);
  });
}