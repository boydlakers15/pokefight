const express = require('express');
const router = express.Router();
const pokemonController = require('./pokemonController');


router.get('/pokemon', pokemonController.getAllPokemon);
router.get('/pokemon/:id', pokemonController.getPokemonById);
router.get('/pokemon/:id/:info', pokemonController.getPokemonInfo);

module.exports = router;