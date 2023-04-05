const express = require('express');
require('dotenv').config();

const { connectDB } = require('./databases/mongo');
const router = require('./routes/user.route');
const notFound = require('./middlewares/notFound');
const { connectMySQL } = require('./databases/mysql');

const app = express();

app.use(router);
app.use(notFound);
const PORT = process.env.PORT;

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
