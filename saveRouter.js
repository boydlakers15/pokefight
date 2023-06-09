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



module.exports = router;
