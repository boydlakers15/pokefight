require('dotenv').config();
const express = require('express');
const cors = require('cors');
const leaderboardRouter = require('./leaderboardRouter');
const saveRouter = require('./saveRouter');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { getAllPokemon } = require('./controllers/pokemonController');
const PORT = process.env.PORT;
require('./db');

// Add session middleware
const session = require('express-session');
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      /https:\/\/645c977dfee4d567a8bbf524--pokemon-grp-3\.netlify\.app/,
    ],
  })
);

// const { User } = require('./modules/user');
const Game = require('./modules/game');
app.use('/', leaderboardRouter);
app.use('/', saveRouter);
app.use('/users', userRouter);
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/pokemon', getAllPokemon);
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

// mongoose.connect(process.env.MONGODBURI);

// Error handling
app.use(errorHandler);

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
    
    app.post('/save', (req, res) => {
      const gameData = req.body;
      const newGame = new Game(gameData);
    
      newGame.save()
        .then(() => {
          res.send('Game saved to database');
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error saving game to database');
        })
    });
    
    app.get('/save', async (req, res) => {
      try {
        const games = await Game.find({});
        res.json(games);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving games from database');
      }
    });
    
    app.delete('/save', async (req, res) => {
      try {
        const result = await Game.deleteOne({ name: "Bob" });
        res.send(`${result.deletedCount} games deleted`);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting games from database');
      }
    });
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.log(error);
  });