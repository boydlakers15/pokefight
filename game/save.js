const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.post('/game/save', async (req, res) => {
  const { playerPokemon, opponentPokemon, winner, turns } = req.body;
  try {
    const game = new Game({
      playerPokemon,
      opponentPokemon,
      winner,
      turns,
    });
    await game.save();
    res.status(200).json({ message: 'Game saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving game' });
  }
});

module.exports = router;
