const fetch = require('node-fetch');

const getAllPokemon = async (req, res) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
    const pokemonData = await response.json();
    res.json(pokemonData);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving pokemon data');
  }
};

module.exports = { getAllPokemon };

// const fs = require('fs');
// const path = require('path');

// function getAllPokemon(req, res) {
//   try {
//     const filePath = path.join(__dirname, 'pokedex.json');
//     const pokemonData = JSON.parse(fs.readFileSync(filePath));
//     res.json(pokemonData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error retrieving pokemon' });
//   }
// }

// module.exports = {
//   getAllPokemon
// }