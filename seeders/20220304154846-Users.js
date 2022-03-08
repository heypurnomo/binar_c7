'use strict';
const fs = require('fs/promises');
const { User } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = await fs.readFile('./data/users.json', 'utf-8');
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      const user = await User.create(data[i]);
      await user.createBiodata(data[i]);
      for (let j = 0; j < data[i].histories.length; j++) {
        await user.createHistory(data[i].histories[j])
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('biodata', null, {});
    await queryInterface.bulkDelete('histories', null, {});
  }
};
