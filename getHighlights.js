/*
getHighlights.js
*/

//  Requirements    //////////////////////////////////////////////////////////////////////////////////

const lib = require('./pokeliticslib.js');
//const parseMatch = require('./pokeliticslib').parseMatch;

//////////////////////////////////////////////////////////////////////////////////////////////////////

let compare = ( (hl1, hl2)=> {
    if (hl1.kills > hl2.kills){
        return -1
    }
    if (hl1.kills < hl2.kills){
        return 1;
    }
    if (hl1.kills == hl2.kills) {
        if (hl1.assists > hl2.assists){
            return -1;
        }
        if (hl1.assists < hl2.assists){
            return 1;
        }
    }
    return 0;
});

exports.main = ( (matchFile)=>{

    var lineups = lib.parseMatch(matchFile);
    for (player in lineups){
        lineups[player].score = 6;
        lineups[player].highlights = [];
        for (mon in lineups[player].mons){
            let pokemon = lineups[player].mons[mon];
            if (!(pokemon.isAlive)){
                lineups[player].score -= 1;
            }
            let highlight = {"name":`${pokemon.name} (${pokemon.species})` ,"kills": pokemon.kills, "assists": pokemon.assists, "isAlive":pokemon.isAlive};
            lineups[player].highlights.push(highlight);
        }
        lineups[player].highlights.sort(compare);
        delete lineups[player].mons;
    }
    return [lineups['p1'], lineups['p2']];
})


//// Tests ///////////////////////////////////////////////////////////////////////////////////////////

exports.testData = exports.main('data/QAData1.html');

//////////////////////////////////////////////////////////////////////////////////////////////////////