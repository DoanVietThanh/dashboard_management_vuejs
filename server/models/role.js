'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.UserRole, { foreignKey: 'roleId', as: 'userRoles' });
    }
  }
  Role.init(
    {
      roleName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};
