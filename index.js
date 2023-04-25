const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // set a default port or read it from environment variable

const pokemonData = require('./pokedex.json'); // import the pokemon data

app.use(cors()); // enable all cors requests

// route to get all pokemon
app.get('/pokemon', (req, res) => {
  res.json(pokemonData);
});

// route to get a single pokemon by id
app.get('/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonData.find(p => p.id === id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ message: 'Pokemon not found' });
  }
});

// route to get a single information (name or type or base) of a pokemon by id
app.get('/pokemon/:id/:info', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
