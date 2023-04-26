const pokemonData = require('../pokedex.json');

exports.getAllPokemon = (req, res) => {
  res.json(pokemonData);
};

exports.getSinglePokemon = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonData.find(p => p.id === id);
  if (!pokemon) {
    res.status(404).send('Pokemon not found');
  } else {
    res.json(pokemon);
  }
};

exports.getPokemonInfo = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonData.find(p => p.id === id);
  if (!pokemon) {
    res.status(404).send('Pokemon not found');
  } else {
    const info = req.params.info;
    if (!(info in pokemon)) {
      res.status(400).send('Invalid information requested');
    } else {
      res.json(pokemon[info]);
    }
  }
};
