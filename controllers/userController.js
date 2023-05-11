const User = require('./modules/user');

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to get users' });
  }
}

async function getUserById(req, res) {
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
}

async function createUser(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }
  try {
    const newUser = new User({ username: req.body.username, password: req.body.password });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create user' });
  }
}

async function updateUser(req, res) {
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
}

async function deleteUser(req, res) {
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
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
