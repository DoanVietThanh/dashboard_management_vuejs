const { User, Role, UserRole } = require('../../models');

const loginUserService = (email, password) => {
  return User.findOne({ where: { email, password } });
};

const isExistingUser = async (email, username) => {
  const isDuplicateEmail = await User.findOne({
    where: { email },
    attributes: ['id', 'username', 'email', 'password'],
  });
  const isDuplicateUsername = await User.findOne({
    where: { username },
    attributes: ['id', 'username', 'email', 'password'],
  });
  if (isDuplicateEmail || isDuplicateUsername) {
    return true;
  }
  return false;
};

const registerUserService = async (data) => {
  const user = await User.create({
    userName: data.username,
    email: data.email,
    password: data.password,
  });
  const userRole = await UserRole.create({
    userId: user.id,
    roleId: 2,
  });
  const role = await Role.findOne({ where: { id: userRole.roleId } });
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
