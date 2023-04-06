const db = require('../models/mysql/models/index');

module.exports.connectMySQL = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log('Successfully connected and synced to MySQL database');
  } catch (error) {
    console.log('Connected failed!', error);
  }
};
