'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      // this.belongsToMany(models.User, { through: 'UserRoles' });
    }
  }
  Role.init(
    {
      roleName: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'roles',
      modelName: 'Role',
    }
  );
  return Role;
};
