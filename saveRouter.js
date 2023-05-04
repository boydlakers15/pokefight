const express = require('express');
const Game = require('./modules/game');
const router = express.Router();

// Handle POST requests to the '/save' endpoint
app.post('/save', async (req, res) => {
  const { playerPokemon, opponentPokemon, winner, turns } = req.body;
  const newGame = new Game({
    playerPokemon,
    opponentPokemon,
    winner,
    turns
  });

  try {
    await newGame.save();
    res.send('Game saved to database');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving game to database');
  }
});


module.exports = router;