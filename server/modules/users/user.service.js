const { User, Role, UserRole } = require('../../models');

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
    userName: data.username,
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
    address: data.address,
  });
  const userRole = await UserRole.create({
    userId: user.dataValues.id,
    roleId: 2,
  });
  const role = await Role.findOne({
    where: { id: userRole.roleId },
    attributes: ['id', 'roleName'],
  });
  return { user: { ...user.dataValues, role: role.dataValues.roleName } };
};

const updateUserService = async (userId, data) => {
  const [numberOfAffectedRows, affectedRows] = await User.update(data, {
    where: { id: userId },
    returning: true,
  });
  if (numberOfAffectedRows > 0) {
    return affectedRows[0];
  }
  return null;
};

module.exports = {
  loginUserService,
  isExistingUser,
  registerUserService,
  updateUserService,
};
