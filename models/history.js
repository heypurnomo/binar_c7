'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  History.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    roundWin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'win must be number'}
      }
    },
    roundDraw: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'win must be number'}
      }
    },
    roundLose: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'win must be number'}
      }
    },
    result: {
      type: DataTypes.ENUM,
      values: ['win', 'lose', 'darw']
    }
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'histories',
    timestamps: true,
    updatedAt: false,
    createdAt: 'playAt',
    hooks: {
      beforeCreate: function(user, options) {
        const win = user.roundWin;
        const lose = user.roundLose;
        const result = (win > lose) ? 'win' : (lose > win) ? 'lose' : 'draw';
        user.result = result;
      }
    }
  });
  return History;
};