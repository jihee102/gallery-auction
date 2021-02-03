const express = require('express');
const app = express();
const cors = require('cors');
const user_router = require('./routes/user');
const painting_router = require('./routes/painting');

const init = () => {
  // Middlewares
  app.use(express.json());
  app.use(cors());
  // Routes
  app.use('/user', user_router);
  app.use('/paintings', painting_router);

  return app;
};

module.exports = init;
