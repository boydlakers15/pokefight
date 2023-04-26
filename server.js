const express = require('express');
const cors = require('cors');
const pokemonData = require('./pokedex.json');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());



// GET route to get the complete list of pokemon
app.get('/pokemon', (req, res) => {
  res.json(pokemonData);
});

// GET route to get a single pokemon by id
app.get('/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonData.find(p => p.id === id);
  if (!pokemon) {
    res.status(404).send('Pokemon not found');
  } else {
    res.json(pokemon);
  }
});

// GET route to get a single pokemon info by id and info
app.get('/pokemon/:id/:info', (req, res) => {
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
});

// start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
