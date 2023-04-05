const mongoose = require('mongoose');

module.exports.connectDB = (url) => {
  mongoose.set('strictQuery', true);
  return mongoose.connect(url);
};
