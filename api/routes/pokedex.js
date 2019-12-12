const express = require('express');
const router = express.Router();
const fs = require('fs');

const { getAllMoves } = require('../../PokecentreAPI');

let dummyPokedexDB = fs.readFileSync('./api/temp-pokedex.json', 'utf8');
dummyPokedexDB = JSON.parse(dummyPokedexDB)

router.get('/', (req, res) => {
  
  let { limit, offset } = req.query;

  // If there's a limit, check for offset and supply requested range
  if (limit){
    if (offset === undefined){
      offset = 0;
    }
    const results = dummyPokedexDB.slice(offset, parseInt(offset)+parseInt(limit));
    res.json(results);
  }
  else{

    console.log('sending entire pokedex')
    res.json(dummyPokedexDB);
  }
})

router.get('/pokemon/:id/moves', (req, res) => {
  getAllMoves(req.params.id)
    .then(data => {
      console.log(data);
      res.json(data)
    });
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