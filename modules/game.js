const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerPokemon: { type: String, required: true },
  opponentPokemon: { type: String, required: true },
  winner: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024,
    }
});

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.password = String(ret.password);
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { Game, User };






// module.exports = Game;

// const mongoose = require('mongoose');


// const gameSchema = new mongoose.Schema({
  
//   playerPokemon: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Pokemon',
//     required: true
//   },
//   opponentPokemon: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Pokemon',
//     required: true
//   },
//   winner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Pokemon',
//     required: true
//   },
//   turns: {
//     type: Number,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Student = mongoose.model('Student', gameSchema);




// module.exports = Game;
// const mongoose = require('mongoose');

// const gameSchema = new mongoose.Schema({
//   playerPokemon: String,
//   opponentPokemon: String,
//   winner: String
// }, {
//   timestamps: true
// });

// const Game = mongoose.model('Game', gameSchema);

// module.exports = Game;