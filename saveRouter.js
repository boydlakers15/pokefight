const express = require('express');
const Game = require('./modules/game');
const router = express.Router();

// Handle POST requests to the '/save' endpoint
router.post('/save', (req, res) => {
  const newGame = new Game({
    playerPokemon: req.body.playerPokemon,
    opponentPokemon: req.body.opponentPokemon,
    winner: req.body.winner,
    turns: req.body.turns
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

module.exports = router;
