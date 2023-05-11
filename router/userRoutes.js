const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  signup,
  logout,
} = require('../controllers/userControllers');

// GET /users - Get all users
router.get('/users', getUsers);

// GET /users/:id - Get a single user
router.get('/users/:id', getUserById);

// POST /users - Create a new user
router.post('/users', createUser);

// PUT /users/:id - Update a user
router.put('/users/:id', updateUser);

// DELETE /users/:id - Delete a user
router.delete('/users/:id', deleteUser);

// POST /login - User login
router.post('/login', login);

// POST /signup - User signup
router.post('/signup', signup);

// GET /logout - User logout
router.get('/logout', logout);

module.exports = router;
