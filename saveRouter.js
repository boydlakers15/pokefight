const express = require('express');
const cors = require('cors');
const Game = require('./modules/game');
const router = express.Router();
require('./db');

module.exports = function(app) {
  app.use('/save', createProxyMiddleware({ target: 'http://localhost:4000' }));
};



app.use(cors({
  origin: 'https://pokemon-backend.herokuapp.com/'
}));



// Handle POST requests to the '/save' endpoint
router.post('/save', (req, res) => {
  const { playerPokemon, opponentPokemon, winner, date } = req.body;
  const newGame = new Game({
    playerPokemon,
    opponentPokemon,
    winner,
    date,
  });

  newGame.save()
    .then(() => {
      res.send('Game saved to database');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error saving game to database');
    });
});

module.exports = router;
