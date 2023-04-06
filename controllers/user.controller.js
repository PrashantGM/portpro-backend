const MongoUser = require('../models/mongo/User.model');
const { sequelize, Sequelize } = require('../models/mysql/models/index');

const CassandraUser = require('../models/cassandra/User.model');
const MySQLUser = require('../models/mysql/models/user')(
  sequelize,
  Sequelize.DataTypes
);

const getUsersFromMongo = async (req, res) => {
  try {
    let users = await MongoUser.find();    
    res.status(200).json({ success: true, noOfHits: users.length,retrievedFrom: 'MongoDB',data: users,});

  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
};
const getUsersFromMySQL = async (req, res) => {
  try {
    const users = await MySQLUser.findAll();
    res.status(200).json({ success: true, noOfHits: users.length,retrievedFrom: 'MySQLDB',data: users,});

  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const getUsersFromCassandra = async (req, res) => {
  try {
    let users = await CassandraUser.findAsync({},
      { select: ['id', 'name', 'profilePic', 'createdAt', 'updatedAt'] } );
    
    res.status(200).json({ success: true, noOfHits: users.length,retrievedFrom: 'CassandraDB',data: users,});

  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = {
  getUsersFromMongo,
  getUsersFromMySQL,
  getUsersFromCassandra,
};
