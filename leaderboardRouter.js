// const express = require('express');
// const Student = require('./modules/game');

// const leaderboardRouter = express.Router();

// leaderboardRouter.get('/comp/leaderboard', async (req, res) => {
//   try {
//     const games = await Student.find().sort('-createdAt').limit(10);
//     res.status(200).json(games);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error retrieving games' });
//   }
// });

// module.exports = leaderboardRouter;
const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/leaderboard', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM leaderboard ORDER BY score DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving leaderboard from database');
  }
});

router.post('/leaderboard', async (req, res) => {
  const { name, score } = req.body;
  try {
    await pool.query('INSERT INTO leaderboard (name, score) VALUES ($1, $2)', [name, score]);
    res.send('Score added to leaderboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding score to leaderboard');
  }
});

module.exports = router;
