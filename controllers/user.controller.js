const MongoUser = require('../models/mongo/User');
const { sequelize, Sequelize } = require('../models/mysql/models/index');

const MySQLUser = require('../models/mysql/models/user')(
  sequelize,
  Sequelize.DataTypes
);

const { getDummyUserData } = require('../utils/fetchUserData');

const getUsersFromMongo = async (req, res) => {
  try {
    let users = await MongoUser.find();
    if (users.length < 1) {
      const parseDataForDB = await getDummyUserData();
      users = await MongoUser.insertMany(parseDataForDB);
    }
    res
      .status(200)
      .json({
        success: true,
        noOfHits: users.length,
        store: 'MongoDB',
        data: users,
      });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
};
const getUsersFromMySQL = async (req, res) => {
  try {
    const users = await MySQLUser.findAll();
    res
      .status(200)
      .json({
        success: true,
        noOfHits: users.length,
        store: 'MySQL',
        data: users,
      });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = { getUsersFromMongo, getUsersFromMySQL };
