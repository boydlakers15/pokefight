const express = require('express');
const app = express();
const pokemonController = require('../controllers/pokemonController');

app.get('/pokemon', pokemonController.getAllPokemon);

router.post('/game/save', async (req, res) => {
    try {
      const gameData = req.body;
      const newGame = new Game(gameData);
      await newGame.save();
      res.status(200).send('Game saved');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving game');
    }
  });

  router.get('/game/leaderboard', async (req, res) => {
    try {
      const games = await Game.find({});
      res.json(games);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving games');
    }
  });
  

module.exports = router;
