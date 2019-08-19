const express = require('express');
const router = express.Router();

const dummyPokedexDB = [
  {
    number: 001,
    species: "bulbasaur",
    types: ["grass", "poison"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  {
    number: 002,
    species: "ivysaur",
    types: ["grass", "poison"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
  },
  {
    number: 003,
    species: "venusaur",
    types: ["grass", "poison"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
  }
]

router.get('/', (req, res) => {
  console.log('sending entire pokedex')
  res.json(dummyPokedexDB);
})

router.get('/pokemon/:id', (req, res) => {
  const mon = dummyPokedexDB[req.params.id - 1];
  if (mon){
    console.log(`Getting data on ${mon.species}`)
    res.json(mon);
  }
  else {
    res.json({ error: `Pokemon with id ${req.params.id} not found!` });
  }
})

module.exports = router;