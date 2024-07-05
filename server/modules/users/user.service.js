const { User, Role, UserRole } = require('../../models');
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
  // Remember run seeders
  const user = await User.create({
    userName: data.userName,
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
    address: data.address,
  });
  const userRole = await UserRole.create({
    userId: formatedObject(user).id,
    roleId: 2,
  });
  const role = await Role.findOne({
    where: { id: userRole.roleId },
    attributes: ['id', 'roleName'],
  });
  return {
    user: { ...formatedObject(user), role: formatedObject(role).roleName },
  };
};

const createUserService = async (data) => {
  const { userName, email, password, phoneNumber, address, role } = data;
  const user = await User.create({
    userName: userName,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    address: address,
  });

  const roleOfUser = await Role.findOne({
    where: { roleName: role },
    attributes: ['id', 'roleName'],
  });

  await UserRole.create({
    userId: formatedObject(user).id,
    roleId: formatedObject(roleOfUser).id,
  });
  return {
    user: {
      ...formatedObject(user),
      role: formatedObject(roleOfUser).roleName,
    },
  };
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
    }
  );

  if (numberOfAffectedRows === 0) {
    return {
      user: null,
    };
  }
  const roleOfUser = await Role.findOne({
    where: { roleName: role },
    attributes: ['id', 'roleName'],
  });
  await UserRole.update(
    {
      roleId: formatedObject(roleOfUser).id,
    },
    {
      where: { userId },
    }
  );
  return {
    user: {
      ...formatedObject(user[0]),
      role: formatedObject(roleOfUser).roleName,
    },
  };
};

const deleteUserService = async (userId) => {
  try {
    // Xóa các vai trò của người dùng trước
    await UserRole.destroy({
      where: { userId },
    });
    // Xóa người dùng
    const result = await User.destroy({
      where: { id: userId },
    });
    return result > 0;
  } catch (error) {
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
