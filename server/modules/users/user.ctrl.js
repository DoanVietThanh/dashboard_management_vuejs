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
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ data: null, error: 'Missing required fields', status: 400 });
  }
  const existingUser = await isExistingUser(email, username);
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
  const { userId } = req.params;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res
      .status(400)
      .json({ data: null, error: 'User not found', status: 400 });
  }
  const updatedUser = await updateUserService(user.id, req.body);
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
