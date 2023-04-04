import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './databases/mongo.js';
import { router } from './routes/user.route.js';

config();

const app = express();
app.use(express.json());

app.use(router);
const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
