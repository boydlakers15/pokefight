const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerPokemon: { type: String, required: true },
  opponentPokemon: { type: String, required: true },
  winner: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
