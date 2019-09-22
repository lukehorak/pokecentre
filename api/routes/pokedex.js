const express = require('express');
const router = express.Router();
const fs = require('fs');

let dummyPokedexDB = fs.readFileSync('./api/temp-pokedex.json', 'utf8');
dummyPokedexDB = JSON.parse(dummyPokedexDB)

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