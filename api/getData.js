require('dotenv').config();

const dex = require('pokedex-promise-v2');
// Knex
//const knexConfig  = require("../knexfile");
//const knex        = require("knex")(knexConfig[ENV]);


const pokedex = new dex();
const promises = [];

//then try 808

const getStats = (block) => {
  const baseStats = {};
  for (let stat of block) {
    baseStats[stat.stat.name] = stat.base_stat
  }
  return baseStats;
}

for (let i = 1; i < 10; i++) {
  promises.push(pokedex.resource(`/api/v2/pokemon/${i}`));
}

// TODO - USE THIS TO SEED DB

Promise.all(promises).then(data => {
    const result = data.map(pokemon => ({
      name: pokemon.name,
      species: pokemon.species.name,
      type1: pokemon.types[0].type.name,
      type2: pokemon.types[1] ? pokemon.types[1].type.name : null,
      hp: pokemon.stats[5].base_stat,
      speed: pokemon.stats[0].base_stat,
      attack: pokemon.stats[4].base_stat,
      defense: pokemon.stats[3].base_stat,
      special_attack: pokemon.stats[2].base_stat,
      special_defense: pokemon.stats[1].base_stat

    }));
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })