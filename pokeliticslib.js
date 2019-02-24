
//  Requirements    //////////////////////////////////////////////////////////////////////////////////

const cheerio = require('cheerio');
const fs = require('fs');

//////////////////////////////////////////////////////////////////////////////////////////////////////

class Pokemon {
    constructor(species){
        this.species = species;
        this.name = species;
        this.isAlive = true;
        this.kills = 0;
        this.assists = 0;
        this.taggedBy = new Array();
    }
} 
exports.Pokemon = Pokemon;


exports.getBattle = ( (filepath) =>{
    var battle = cheerio.load(fs.readFileSync(filepath));
    battle = battle('.battle-log-data').html().split(/\n/);
    return battle.map(x => x.substring(1,).split(/\|/));
});

exports.getSpecies = ( (line) => {
    let species = line[2].split(/,/)[0];
    if (species.includes('-')){
        let speciesSplit = species.split('-');
        let hyphens = ['porygon', 'ho', 'rotom'];
        if (hyphens.includes(speciesSplit[0].toLowerCase()) || speciesSplit[1].toLowerCase() === 'alola'){
            return species;
        }
        if (speciesSplit[0].toLowerCase() === 'silvally'){
            return speciesSplit[0];
        }
        switch (speciesSplit[1].toLowerCase()){
            case '':
                return speciesSplit[0];
            case 'mega':
                return speciesSplit[0];
            default:
                return species;
        }
    }
    return species;
})

exports.getPlayer = ( (line)=> {
    // toString() this in case of all-number username
    return line[1].split(/a: /)[0].toString();
});

exports.getName = ( (line)=> {
    return line[1].split(/a: /)[1];
})

exports.switchMon = ( (active, lookup, line, lineups)=> {
    
    let name = exports.getName(line);
    let species = exports.getSpecies(line);
    let trainer = exports.getPlayer(line);
    if (!lookup[name]){
        lookup[name] = species;
        lineups[trainer]['mons'][species]['name'] = name
    }

    //console.log("swich occurred!\n", line)
    
    active[trainer] = species;
});

exports.move = ( (lineups, lookup, line)=> {
    let offTrainer = exports.getPlayer(line);
    let offMon = lookup[line[1].split(/a: /)[1]];
    let defTrainer = line[3].split(/a: /)[0];
    let defMon = lookup[line[3].split(/a: /)[1]];
    
    if (offTrainer!=defTrainer){
        if (!lineups[defTrainer].mons[defMon].taggedBy.includes(offMon)){
            lineups[defTrainer].mons[defMon].taggedBy.push(offMon);
        }
    }
});

exports.knockout = ( (active, lineups, lookup, line)=>{

    let loser = exports.getPlayer(line);
    let winner = null;
    let fainted = lookup[exports.getName(line)];     // lookup species from name on line

    switch (loser){
        case 'p1':
            winner = 'p2';
            break;

        case 'p2':
            winner = 'p1';
            break;
    }
    let scoredBy = active[winner];

    // give scorer a kill
    try{
        lineups[winner].mons[scoredBy].kills += 1;
    }
    catch{
        console.log('fucked up on ', scoredBy)
    }

    // faint loser
    lineups[loser].mons[fainted].isAlive = false;

    // remove killer from assists
    let scoredIndex = lineups[loser].mons[fainted].taggedBy.indexOf(scoredBy);
    if (scoredIndex > -1) {
        lineups[loser].mons[fainted].taggedBy.splice(scoredIndex, 1);
    }

    // hand out assists to all in pokemon.taggedBy array
    for (mon in lineups[loser].mons[fainted].taggedBy){
        let assistMon = lineups[loser].mons[fainted].taggedBy[mon];
        lineups[winner].mons[assistMon].assists += 1;
    };

});

exports.parseMatch = ( (matchFile)=> {
    const battleLog = exports.getBattle(matchFile)
    var activeMons = {}; // note active mon using species as ID
    var lookups = {}; // for looking up species by name
    var lineups = 
        {
            'p1': {
                'name':null,
                'mons':{}
            },
            'p2': {
                'name':null,
                'mons':{}
            }
        };

    // Set Lineups
    for (i in battleLog){
        let who;
        switch(battleLog[i][0]){
            case 'player':
                // Same as getPlayer()
                who = battleLog[i][1];
                lineups[who].name = battleLog[i][2].toString()
                break;
            case 'poke':
                who = battleLog[i][1];
                // split gender from species
                let pokemon = new exports.Pokemon(exports.getSpecies(battleLog[i]))
                lineups[who].mons[pokemon.species] = pokemon; // add species as attribute with key being species
                break;
            case 'teampreview':
                break;
            case 'switch':
                exports.switchMon(activeMons, lookups, battleLog[i], lineups);
                break;
            case 'drag':
                exports.switchMon(activeMons, lookups, battleLog[i], lineups);
                break;
            case 'move':
                if (battleLog[i][4] === '[still]'){
                    console.log('charging attack, nothing happens')
                    break;
                }   
                else{
                    exports.move(lineups, lookups, battleLog[i]);
                    break;
                }
                
            case '-anim':
                exports.move(lineups, lookups, battleLog[i]);
            case 'faint':
                exports.knockout(activeMons, lineups, lookups, battleLog[i]);
        }
    }
    return lineups;
});