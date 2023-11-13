const connection = require('./infrastructure/connection');
const customExpress = require('./config/customExpress');

connection.connect((error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log('Conectado ao bando de dados!');

  require('./infrastructure/setup.js');

  const app = customExpress();
  const port = 3000;
  app.listen(port, () => console.log(`Servidor online! Rodando na porta ${port}`));
});