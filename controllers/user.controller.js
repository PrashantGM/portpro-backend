const MongoUser = require('../models/mongo/User');
const { sequelize, Sequelize } = require('../models/mysql/models/index');

const models = require('../databases/cassandra');
const CassandraUser = require('../models/cassandra/UserModel');
const MySQLUser = require('../models/mysql/models/user')(
  sequelize,
  Sequelize.DataTypes
);

const getDummyUserData = require('../utils/fetchUserData');
const { doBatchAsync } = require('express-cassandra');
const User = require('../models/mongo/User');

const getUsersFromMongo = async (req, res) => {
  try {
    let users = await MongoUser.find();
    if (users.length < 1) {
      const parseDataForDB = await getDummyUserData();
      users = await MongoUser.insertMany(parseDataForDB);
    }
    res.status(200).json({
      success: true,
      noOfHits: users.length,
      retrievedFrom: 'MongoDB',
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
};
const getUsersFromMySQL = async (req, res) => {
  try {
    const users = await MySQLUser.findAll();
    res.status(200).json({
      success: true,
      noOfHits: users.length,
      retrievedFrom: 'MySQLDB',
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const getUsersFromCassandra = async (req, res) => {
  try {
    let users = await CassandraUser.findAsync(
      {},
      { select: ['id', 'name', 'profilePic', 'createdAt', 'updatedAt'] }
    );
    if (users.length < 1) {
      let queries = [];
      const parseDataForDB = await getDummyUserData();

      for (const user of parseDataForDB) {
        const userInstance = new CassandraUser(user);
        const insertUser = userInstance.save({ return_query: true });
        queries.push(insertUser);
      }
      const result = await models.doBatchAsync(queries);
      users = result;
    }
    res.status(200).json({
      success: true,
      noOfHits: users.length,
      retrievedFrom: 'CassandraDB',
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = {
  getUsersFromMongo,
  getUsersFromMySQL,
  getUsersFromCassandra,
};
