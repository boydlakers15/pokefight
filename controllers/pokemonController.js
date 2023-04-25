const pokemonData = require('../pokedex.json');

exports.getAllPokemon = (req, res) => {
  res.json(pokemonData);
};

exports.getSinglePokemon = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonData.find(p => p.id === id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ message: 'Pokemon not found' });
  }
};

exports.getSinglePokemonInfo = (req, res) => {
  const id = parseInt(req.params.id);
  const info = req.params.info.toLowerCase();
  const pokemon = pokemonData.find(p => p.id === id);
  if (pokemon) {
    switch (info) {
      case 'name':
        res.json({ name: pokemon.name });
        break;
      case 'type':
        res.json({ type: pokemon.type });
        break;
      case 'base':
        res.json({ base: pokemon.base });
        break;
      default:
        res.status(400).json({ message: 'Invalid information requested' });
    }
  } else {
    res.status(404).json({ message: 'Pokemon not found' });
  }
};
