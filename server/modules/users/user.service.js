const { sequelize, User, Role, UserRole } = require('../../models');
const { formatedObject } = require('../../helper/index');

const loginUserService = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
    attributes: ['id', 'userName', 'email', 'phoneNumber', 'address'],
    include: {
      model: UserRole,
      as: 'userRoles',
      include: {
        model: Role,
        as: 'role',
        attributes: ['roleName'],
      },
    },
  });
  return JSON.parse(JSON.stringify(user));
};

const isExistingUser = async (email, userName) => {
  const isDuplicateEmail = await User.findOne({
    where: { email },
    attributes: ['id', 'userName', 'email', 'password'],
  });
  const isDuplicateUsername = await User.findOne({
    where: { userName },
    attributes: ['id', 'userName', 'email', 'password'],
  });
  if (isDuplicateEmail || isDuplicateUsername) {
    return true;
  }
  return false;
};

const registerUserService = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.create(
      {
        userName: data.userName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
      { transaction }
    );

    const userRole = await UserRole.create(
      {
        userId: formatedObject(user).id,
        roleId: 2,
      },
      { transaction }
    );

    const role = await Role.findOne(
      {
        where: { id: userRole.roleId },
        attributes: ['id', 'roleName'],
      },
      { transaction }
    );

    await transaction.commit();
    return {
      user: { ...formatedObject(user), role: formatedObject(role).roleName },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const createUserService = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { userName, email, password, phoneNumber, address, role } = data;
    const user = await User.create(
      {
        userName: userName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      },
      { transaction }
    );

    const roleOfUser = await Role.findOne(
      {
        where: { roleName: role },
        attributes: ['id', 'roleName'],
      },
      { transaction }
    );

    await UserRole.create(
      {
        userId: formatedObject(user).id,
        roleId: formatedObject(roleOfUser).id,
      },
      { transaction }
    );

    await transaction.commit();
    return {
      user: {
        ...formatedObject(user),
        role: formatedObject(roleOfUser).roleName,
      },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getAllUsersService = async () => {
  const users = await User.findAll({
    include: {
      model: UserRole,
      as: 'userRoles',
      attributes: ['id'],
      include: {
        model: Role,
        as: 'role',
        attributes: ['id', 'roleName'],
      },
    },
  });
  const formatedUsers = users?.map((user) => {
    return {
      ...formatedObject(user),
      userRoles: undefined,
      role: formatedObject(user).userRoles[0].role.roleName,
    };
  });
  return formatedUsers;
};

const updateUserService = async (userId, data) => {
  const transaction = await sequelize.transaction();
  try {
    const { userName, email, password, phoneNumber, address, role } = data;
    const [numberOfAffectedRows, user] = await User.update(
      {
        userName: userName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      },
      {
        where: { id: userId },
        returning: true,
        transaction,
      }
    );

    if (numberOfAffectedRows === 0) {
      await transaction.rollback();
      return {
        user: null,
      };
    }

    const roleOfUser = await Role.findOne(
      {
        where: { roleName: role },
        attributes: ['id', 'roleName'],
      },
      { transaction }
    );

    await UserRole.update(
      {
        roleId: formatedObject(roleOfUser).id,
      },
      {
        where: { userId },
        transaction,
      }
    );

    await transaction.commit();
    return {
      user: {
        ...formatedObject(user[0]),
        role: formatedObject(roleOfUser).roleName,
      },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteUserService = async (userId) => {
  const transaction = await sequelize.transaction();
  try {
    await UserRole.destroy({
      where: { userId },
      transaction,
    });

    const result = await User.destroy({
      where: { id: userId },
      transaction,
    });

    await transaction.commit();
    return result > 0;
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting user:', error);
    return false;
  }
};

module.exports = {
  loginUserService,
  isExistingUser,
  registerUserService,
  createUserService,
  updateUserService,
  getAllUsersService,
  deleteUserService,
};
