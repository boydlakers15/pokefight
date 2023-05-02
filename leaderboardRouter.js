const express = require('express');
const Student = require('./modules/game');

const leaderboardRouter = express.Router();

leaderboardRouter.get('/comp/leaderboard', async (req, res) => {
  try {
    const games = await Student.find().sort('-createdAt').limit(10);
    res.status(200).json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving games' });
  }
});

module.exports = leaderboardRouter;
