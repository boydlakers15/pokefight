require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const leaderboardRouter = require('./leaderboardRouter');
const saveRouter = require('./saveRouter');
const bodyParser = require('body-parser');
const { getAllPokemon } = require('./controllers/pokemonController');
require('./db');
// Add session middleware

const app = express();
// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
    ],
  })
);
const User  = require('./modules/user');

const secret = process.env.JWT_SECRET;
app.use('/', leaderboardRouter);
app.use('/', saveRouter);
app.use(bodyParser.json());
app.get('/pokemon', getAllPokemon);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const PORT = process.env.PORT;
//mongoose.connect(process.env.MONGODBURI);
// GET /users ⇒ return all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to get users' });
  }
});

// GET /users/:id ⇒ return a single user
app.get('/users/:id', async (req, res) => {
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
app.post('/users', async (req, res) => {
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
app.put('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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
// POST /login ⇒ login and return
app.post('/login', async (req, res) => {
  try {
      const { userName, email, password } = req.body;
      const user = await User.findOne({ $or: [{ userName }, { email }] }).select('+password');
      if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }
      if (user.password !== password) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }
      const token = jwt.sign({ id: user._id }, secret);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ message: 'Logged in successfully'});
  } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid username or password' });
  }
});

// POST /signup ⇒ create a new user
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, userName, password } = req.body;
  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const user = await User.create({ firstName, lastName, email, userName, password });
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
});
// GET /logout ⇒ logout and clear JWT cookie
app.get('/logout', (req, res) => {
    req.session.destroy(); // Destroy the session
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});
fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
  .then(response => response.json())
  .then(pokemonData => {
    app.get('/pokemon', (req, res) => {
      res.json(pokemonData);
    });
    app.get('/pokemon/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const pokemon = pokemonData.find(p => p.id === id);
      if (!pokemon) {
        res.status(404).send('Pokemon not found');
      } else {
        res.json(pokemon);
      }
    });
    app.get('/pokemon/:id/:info', (req, res) => {
      const id = parseInt(req.params.id);
      const pokemon = pokemonData.find(p => p.id === id);
      if (!pokemon) {
        res.status(404).send('Pokemon not found');
      } else {
        const info = req.params.info;
        if (!(info in pokemon)) {
          res.status(400).send('Invalid information requested');
        } else {
          res.json(pokemon[info]);
        }
      }
    });
    
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.log(error);
  });