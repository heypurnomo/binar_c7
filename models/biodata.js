'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Biodata.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Biodata.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `name can't be empty`
        },
        len: {
          args: [0, 50],
          msg: `name must be less than 50`
        },
        notNull: {msg: 'cannot be null'}
      }
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['Male', 'Female'],
      allowNull: false,
      validate: {
        isIn: {
          args: [['Male', 'Female']],
          msg: 'gender must be Male or Female'
        },
        notNull: {msg: 'cannot be null'}
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull:false,
      validate: {
        isDate: {
          args: true,
          msg: 'date not valid'
        },
        notNull: {
          msg: 'cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Biodata',
    tableName: 'biodata',
    timestamps: false
  });
  return Biodata;
};