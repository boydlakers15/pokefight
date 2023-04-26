const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerPokemon: { type: Object, required: true },
  opponentPokemon: { type: Object, required: true },
  winner: { type: Object, required: true },
  turns: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
