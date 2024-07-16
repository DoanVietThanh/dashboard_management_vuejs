const { User } = require('../../models');

const {
  loginUserService,
  registerUserService,
  isExistingUser,
  getAllUsersService,
  updateUserService,
  createUserService,
  deleteUserService,
} = require('./user.service');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ data: null, message: 'Missing required fields', status: 400 });
  }
  const user = await loginUserService(email, password);
  if (!user) {
    return res
      .status(400)
      .json({ data: null, message: 'Invalid email or password', status: 400 });
  }
  return res.json({
    data: {
      ...user,
      userRoles: undefined,
      role: user.userRoles[0].role.roleName,
    },
    message: 'Login successfully',
    status: 200,
  });
};

const registerUser = async (req, res) => {
  const { userName, email, password, phoneNumber, address } = req.body;
  if (!email || !password || !userName || !phoneNumber || !address) {
    return res
      .status(400)
      .json({ data: null, message: 'Missing required fields', status: 400 });
  }
  const existingUser = await isExistingUser(email, userName);
  if (existingUser) {
    return res.status(400).json({
      data: null,
      message: 'Username or Email already exists',
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

const createUser = async (req, res) => {
  const { userName, email, password, phoneNumber, address, role } = req.body;
  if (!email || !password || !userName || !phoneNumber || !address || !role) {
    return res
      .status(400)
      .json({ data: null, message: 'Missing required fields', status: 400 });
  }
  const existingUser = await isExistingUser(email, userName);
  if (existingUser) {
    return res.status(400).json({
      data: null,
      message: 'Username or Email already exists',
      status: 400,
    });
  }
  const user = await createUserService(req.body);
  return res.json({
    data: user,
    message: 'User created successfully',
    status: 200,
  });
};

const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
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
      .json({ data: null, message: 'User not found', status: 400 });
  }
  return res.json({
    data: user,
    message: 'Get user successfully',
    status: 200,
  });
};
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { userName, email, password, phoneNumber, address, role } = req.body;

  // Kiểm tra xem người dùng có tồn tại không
  const existingUser = await User.findByPk(userId);
  if (!existingUser) {
    return res
      .status(400)
      .json({ data: null, message: 'User not found', status: 400 });
  }

  // Kiểm tra các trường bắt buộc
  if (!email || !password || !userName || !phoneNumber || !address || !role) {
    return res
      .status(400)
      .json({ data: null, message: 'Missing required fields', status: 400 });
  }

  // Chỉ kiểm tra email nếu nó đã thay đổi
  if (email !== existingUser.email) {
    const userWithEmail = await User.findOne({ where: { email } });
    if (userWithEmail && userWithEmail.id !== parseInt(userId)) {
      return res
        .status(400)
        .json({ data: null, message: 'Email already in use', status: 400 });
    }
  }

  // Cập nhật người dùng
  const user = await updateUserService(userId, req.body);
  if (!user) {
    return res
      .status(400)
      .json({ data: null, message: 'User not found', status: 400 });
  }

  return res.json({
    data: user,
    message: 'User updated successfully',
    status: 200,
  });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  // Kiểm tra xem người dùng có tồn tại không
  const existingUser = await User.findByPk(userId);
  if (!existingUser) {
    return res
      .status(404)
      .json({ data: null, message: 'User not found', status: 404 });
  }

  // Xóa người dùng
  const userDeleted = await deleteUserService(userId);
  if (!userDeleted) {
    return res
      .status(500)
      .json({ data: null, message: 'Failed to delete user', status: 500 });
  }

  return res.json({
    data: null,
    message: 'User deleted successfully',
    status: 200,
  });
};

module.exports = {
  loginUser,
  registerUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
