'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('biodata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: "users",
          key: "id"
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('biodata');
  }
};