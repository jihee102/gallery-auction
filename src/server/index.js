const express = require('express');
const app = express();
const cors = require('cors');
const user_router = require('./routes/user');
const painting_router = require('./routes/painting');

const init = () => {
  // Middlewares
  app.use(express.json());
  app.use(cors());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
    );
    next();
  });
  // Routes
  app.use('/user', user_router);
  app.use('/paintings', painting_router);

  return app;
};

module.exports = init;
