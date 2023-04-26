const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/game/Leaderboard', async (req, res) => {
  try {
    const games = await Game.find().sort('-createdAt').limit(10);
    res.status(200).json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving games' });
  }
});

module.exports = router;
