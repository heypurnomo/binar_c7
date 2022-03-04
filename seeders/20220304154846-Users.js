'use strict';
const fs = require('fs/promises');
const { User } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
      let data = await fs.readFile('./data/users.json', 'utf-8');
      data = JSON.parse(data);
      for (let i = 0; i < data.length; i++) {
        let {email, password, role, name, gender, birthday} = data[i];
        const user = await User.create({email, password, role});
        await user.createBiodata({name, gender, birthday});
      }
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
