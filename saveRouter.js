const express = require('express');
const Game = require('./modules/game');
const router = express.Router();

// Handle POST requests to the '/save' endpoint
router.post('/save', async (req, res) => {
  const { playerPokemon, opponentPokemon, winner, date } = req.body;

  try {
    const game = new Game({
      playerPokemon,
      opponentPokemon,
      winner,
      createdAt: date,
    });
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save game' });
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

module.exports = router;
