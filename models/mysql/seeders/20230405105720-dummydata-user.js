'use strict';

const { getDummyUserData } = require('../../../utils/loadUserData');
const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/user')(sequelize, Sequelize.DataTypes);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dummyUserData = await getDummyUserData();
    await User.bulkCreate(dummyUserData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
