'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      roleId: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
