require('dotenv').config();

const fs = require('fs');
const dex = require('pokedex-promise-v2');
// Knex
//const knexConfig  = require("../knexfile");
//const knex        = require("knex")(knexConfig[ENV]);


const pokedex = new dex();
const promises = [];


for (let i = 701; i < 807; i++) {
  promises.push(pokedex.resource(`/api/v2/pokemon/${i}`));
}

// TODO - USE THIS TO SEED DB

Promise.all(promises).then(data => {
    const result = data.map(pokemon => ({
      name: pokemon.name,
      number: pokemon.id,
      species: pokemon.species.name,
      type1: pokemon.types[0].type.name,
      type2: pokemon.types[1] ? pokemon.types[1].type.name : null,
      hp: pokemon.stats[5].base_stat,
      speed: pokemon.stats[0].base_stat,
      attack: pokemon.stats[4].base_stat,
      defense: pokemon.stats[3].base_stat,
      special_attack: pokemon.stats[2].base_stat,
      special_defense: pokemon.stats[1].base_stat,
      sprite: pokemon.sprites.front_default

    }));
    fs.writeFile('./pokedex(807).json', JSON.stringify(result), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    //console.log(result)
  })
  .catch(error => {
    console.log(error)
  })