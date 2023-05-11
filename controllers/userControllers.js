const User = require('../modules/user');
const ErrorStatus = require('../utils/errorStatus');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to get users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'User not found' });
  }
};

const createUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }
  try {
    const newUser = new User({ username: req.body.username, password: req.body.password });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, secret);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create user' });
  }
};

const updateUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'User not found' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'User not found' });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, secret);
    req.session.user = user; // Store the user in the session
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid username or password' });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const user = await User.create({ firstName, lastName, email, username, password });
    if (!user) {
      return res.status(500).send('Failed to create user');
    }
    const token = jwt.sign({ id: user._id }, secret);
    req.session.user = user; // Store the user in the session
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

const logout = (req, res) => {
  req.session.destroy(); // Destroy the session
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  signup,
  logout,
};

