const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const router = express.Router();
const secret = process.env.JWT_SECRET;

// GET /users ⇒ return all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to get users' });
  }
});

// GET /users/:id ⇒ return a single user
router.get('/:id', async (req, res) => {
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
});

// POST /users ⇒ create a new user
router.post('/', async (req, res) => {
  if (!req.body.userName || !req.body.password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isAdmin: req.body.isAdmin || false,
    });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, secret);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// PUT /users/:id ⇒ update a specific user
router.put('/:id', async (req, res) => {
  if (!req.body.userName || !req.body.password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isAdmin: req.body.isAdmin || false,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE /users/:id ⇒ delete a specific user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.continue('/login').status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
