const dex = require('pokedex-promise-v2');

const pokedex = new dex();
const promises = [];

//then try 808

for (let i = 1; i < 10; i++) {
  promises.push(pokedex.resource(`/api/v2/pokemon/${i}`));
}

Promise.all(promises).then(data => {
    const result = data.map(pokemon => pokemon.name);
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })