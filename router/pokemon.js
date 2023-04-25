const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/', pokemonController.getAllPokemon);
router.get('/:id', pokemonController.getSinglePokemon);
router.get('/:id/:info', pokemonController.getSinglePokemonInfo);

module.exports = router;
