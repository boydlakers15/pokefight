const express = require('express');
const cors = require('cors');
const leaderboardRouter = require('./leaderboardRouter');
const saveRouter = require('./saveRouter');
const bodyParser = require('body-parser');
const { getAllPokemon } = require('./controllers/pokemonController');
const Game = require('./modules/game');

require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*'
}));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/pokemon', getAllPokemon);

app.use('/', leaderboardRouter);
app.use('/', saveRouter);



app.post('/save', (req, res) => {
  const newGame = new Game({
    playerPokemon: 'Charizard',
    opponentPokemon: 'Volcanion',
    winner: 'Volcanion',
    turns: 5
  });

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
    const filter = { winner: "Infernape" };
    const result = await Game.deleteMany(filter);
    res.send(`${result.deletedCount} games deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting games from database');
  }
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

async function startServer() {
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
