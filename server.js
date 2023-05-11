require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const leaderboardRouter = require('./leaderboardRouter');
const saveRouter = require('./saveRouter');
const userRouter = require('./router/usersRouter');
const { getAllPokemon } = require('./controllers/pokemonController');
const User = require('./modules/user');
require('./db');

// Add session middleware
const session = require('express-session');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
  origin: 'https://645c977dfee4d567a8bbf524--pokemon-grp-3.netlify.app'
};

// Routes
app.use('/', leaderboardRouter);
app.use('/', saveRouter);
app.use('/users', userRouter);
app.get('/pokemon', getAllPokemon);
app.use(cors(corsOptions));

// Database connections
const secret = process.env.JWT_SECRET;
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGODBURI);

// Add session configuration
const sess = {
  secret: 'keyboard cat',
  cookie: {}
};

// Use session middleware
app.use(session(sess));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://645c977dfee4d567a8bbf524--pokemon-grp-3.netlify.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
