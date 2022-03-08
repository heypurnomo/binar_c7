'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roundWin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      roundDraw: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      roundLose: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      result: {
        type: Sequelize.ENUM('win', 'lose', 'draw')
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "users",
          key: "id"
        }
      },
      playAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('histories');
  }
};