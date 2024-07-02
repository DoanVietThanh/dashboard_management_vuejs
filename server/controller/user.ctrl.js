const { User, Role, UserRole } = require('../models');

const createUser = async (req, res) => {
  try {
    const { email, password, phone, roleId, address } = req.body;
    if (!email || !password || !roleId || !phone || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const role = await Role.findOne({ where: { id: roleId } });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    const user = await User.create({
      email,
      password,
      phone,
      address,
    });
    await UserRole.create({ userId: user.id, roleId: role.id });
    return res.status(201).json({
      data: user,
      message: 'Create user successfully',
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({ message: 'Users not found' });
    }
    return res.status(200).json({
      data: users,
      message: 'Get all users successfully',
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { createUser, getUsers };
