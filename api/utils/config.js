require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

module.exports = {
  MONGODB_URI,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
};
