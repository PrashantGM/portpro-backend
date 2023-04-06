const mongoose = require('mongoose');
const User = require('../models/mongo/User.model');
const { insertToMongo } = require('../utils/loadUserData');

module.exports.connectDB = (url) => {
  mongoose.set('strictQuery', true);
  return mongoose.connect(url);
};

mongoose.connection.once('open', async () => {
  console.log('Successfully connected to MongoDB database');
  let users = await User.find();
  if (users.length < 1) {
    await insertToMongo(User);
  }
});

mongoose.connection.on('error', (err) => {
  console.log("Couldn't connect to MongoDB database. Please try again!");
});
