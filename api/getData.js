const dex = require('pokedex-promise-v2');

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


Promise.all(promises).then(data => {
    const result = data.map(pokemon => ({
      name: pokemon.name,
      species: pokemon.species.name,
      types: pokemon.types.map( type => type.type.name ),
      stats: getStats(pokemon.stats)

    }));
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })