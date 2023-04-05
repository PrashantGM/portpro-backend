const db = require('../models/mysql/models/index');

module.exports.connectMySQL = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log('Successfully synced to mysql database');
  } catch (error) {
    console.log('Connected failed!', error);
  }
};
