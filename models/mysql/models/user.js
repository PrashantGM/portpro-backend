'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      freezeTableName: true,
    }
  );
  return User;
};
