const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./databases/mongo');
const router = require('./routes/user.route');
const notFound = require('./middlewares/notFound');
const { connectMySQL } = require('./databases/mysql');

const PORT = process.env.PORT;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(helmet);
app.use(limiter);

app.use(router);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await connectMySQL();
    app.listen(PORT, console.log(`Listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
