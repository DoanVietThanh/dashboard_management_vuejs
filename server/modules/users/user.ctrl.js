const { User, UserRole, Role } = require('../../models');

const {
  loginUserService,

  registerUserService,
  updateUserService,
  isExistingUser,
} = require('./user.service');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ data: null, error: 'Missing required fields', status: 400 });
  }
  const user = await loginUserService(email, password);
  if (!user) {
    return res
      .status(400)
      .json({ data: null, error: 'Invalid email or password', status: 400 });
  }
  return res.json({
    data: user,
    message: 'Login successful',
    status: 200,
  });
};

const registerUser = async (req, res) => {
  const { userName, email, password, phoneNumber, address } = req.body;
  if (!email || !password || !userName || !phoneNumber || !address) {
    return res
      .status(400)
      .json({ data: null, error: 'Missing required fields', status: 400 });
  }
  const existingUser = await isExistingUser(email, userName);
  if (existingUser) {
    return res.status(400).json({
      data: null,
      error: 'Username or Email already exists',
      status: 400,
    });
  }
  const user = await registerUserService(req.body);
  return res.json({
    data: user,
    message: 'User created successfully',
    status: 200,
  });
};
const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'userName', 'email', 'password'],
    order: [['id', 'ASC']],
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
  return res.json({
    data: users,
    message: 'Get all users successfully',
    status: 200,
  });
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res
      .status(400)
      .json({ data: null, error: 'User not found', status: 400 });
  }
  return res.json({
    data: user,
    message: 'Get user successfully',
    status: 200,
  });
};

const updateUser = async (req, res) => {
  const { userId } = req.params; // User ID from request parameters
  const { userName, password, roleId, phoneNumber, address } = req.body; // Updated details from request body

  const user = await User.findByPk(userId, {
    attributes: [
      'id',
      'userName',
      'email',
      'password',
      'phoneNumber',
      'address',
    ],
  });
  console.log('🚀 ~ updateUser ~ user:', user);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the user details
  user.userName = userName || user.userName;
  user.password = password || user.password;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.address = address || user.address;
  await user.save();

  // Update the user's role
  let userRole = await UserRole.findOne({
    where: { userId },
  });
  if (userRole) {
    userRole.roleId = roleId;
    await userRole.save();
  } else {
    await UserRole.create({
      userId: id,
      roleId: roleId,
    });
  }

  // Respond with the updated user
  const updatedUser = await User.findByPk(userId, {
    attributes: ['id', 'userName', 'email'],
    include: {
      model: UserRole,
      as: 'userRoles',
      attributes: ['id'],
      include: {
        model: Role,
        as: 'role',
        attributes: ['roleName'],
      },
    },
  });

  return res.json({
    data: updatedUser,
    message: 'User updated successfully',
    status: 200,
  });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res
      .status(400)
      .json({ data: null, error: 'User not found', status: 400 });
  }
  await user.destroy();
  return res.json({
    data: user,
    message: 'User deleted successfully',
    status: 200,
  });
};

module.exports = {
  loginUser,
  registerUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
