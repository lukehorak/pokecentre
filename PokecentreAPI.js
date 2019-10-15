const Pokedex = require('pokedex-promise-v2');
const dex = new Pokedex();

const getMove = (moveData) => {
  return ({
    move: moveData.name.replace('-', ' '),
    power: moveData.power,
    accuracy: moveData.accuracy,
    type: moveData.type.name,
    pp: moveData.pp,
    priority: moveData.priority,
    damage_class: moveData.damage_class.name,
  })
}
module.exports =  {
  getAllMoves: async (species) =>{
    const { moves } = await dex.getPokemonByName(species);
    let moveData;
    const moveList = [];
  
    for (let move of moves){
      moveData = await dex.getMoveByName(move.move.name);
      moveList.push(getMove(moveData));
    }
    return moveList;
  }
}