const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

const catsRouter = require('./controllers/cats');

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to redis');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/api/v1/cats', catsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
