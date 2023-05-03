const express = require('express');
const app = express();
const pokemonController = require('../controllers/pokemonController');

app.get('/pokemon', pokemonController.getAllPokemon);



module.exports = router;
