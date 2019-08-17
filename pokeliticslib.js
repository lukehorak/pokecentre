//  Requirements  /////////////////////////////////////////////////////////////////////////////////
const cheerio = require('cheerio');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////////////////////////
// Class Declaratoin(s) ///////////////////////////////////////////////////////////////////////////

class Pokemon {
  constructor(species) {
    this.species = species;
    this.name = species;
    this.isAlive = true;
    this.kills = 0;
    this.assists = 0;
    this.taggedBy = new Array();
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getBattle: function (filepath) {
    var battle = cheerio.load(fs.readFileSync(filepath));
    battle = battle('.battle-log-data').html().split(/\n/);
    return battle.map(x => x.substring(1, ).split(/\|/));
  },
  "Pokemon": Pokemon,
  getSpecies: function (line) {
    let species = line[2].split(/,/)[0];
    if (species.includes('-')) {
      let speciesSplit = species.split('-');
      // For mons like 'porygon', 'ho-oh', 'rotom';
      if (speciesSplit[0].toLowerCase() === 'silvally') {
        return speciesSplit[0];
      }
      const ignore = ['', 'mega', '*'];
      if (ignore.indexOf(speciesSplit[1].toLowerCase()) > -1) {
        return speciesSplit[0]
      }
    }
    return species;
  },
  getPlayer: function (line) {
    // TODO [investigate] - is .toString() necessary here?
    // toString() this in case of all-number username
    return line[1].split(/a: /)[0].toString();
  },
  getName: function (line) {
    return line[1].split(/a: /)[1];
  },
  switchMon: function (active, lookup, line, lineups) {
    let name = this.getName(line);
    let species = this.getSpecies(line);
    let trainer = this.getPlayer(line);
    if (!lookup[name]) {
      lookup[name] = species;
      lineups[trainer]['mons'][species]['name'] = name
    }
    active[trainer] = species;
  },
  move: function (lineups, lookup, line) {
    // Set the "who's who" for the move
    let offTrainer = this.getPlayer(line);
    let offMon = lookup[line[1].split(/a: /)[1]];
    let defTrainer = line[3].split(/a: /)[0];
    let defMon = lookup[line[3].split(/a: /)[1]];
    //  TODO [investigate] - why the fuck are you checking this?
    if (offTrainer != defTrainer) {
      if (!lineups[defTrainer].mons[defMon].taggedBy.includes(offMon)) {
        lineups[defTrainer].mons[defMon].taggedBy.push(offMon);
      }
    }
  },
  knockout: function (active, lineups, lookup, line) {
    let loser = this.getPlayer(line);
    let fainted = lookup[this.getName(line)]; // lookup species from name on line
    // Find who knocked out who
    let winner = (loser === 'p1' ? 'p2' : 'p1');
    let scoredBy = active[winner];
    // give scorer a kill
    try {
      lineups[winner].mons[scoredBy].kills += 1;
    } catch (e) {
      // Error logging
      console.log('fucked up on ', scoredBy)
    }
    // faint loser, log name 
    if (lineups[loser].mons[fainted] === undefined) {
      console.log(loser, this.getName(line))
    }
    lineups[loser].mons[fainted].isAlive = false;

    // remove killer from assists
    let scoredIndex = lineups[loser].mons[fainted].taggedBy.indexOf(scoredBy);
    if (scoredIndex > -1) {
      lineups[loser].mons[fainted].taggedBy.splice(scoredIndex, 1);
    }

    // hand out assists to all in pokemon.taggedBy array
    for (mon in lineups[loser].mons[fainted].taggedBy) {
      let assistMon = lineups[loser].mons[fainted].taggedBy[mon];
      lineups[winner].mons[assistMon].assists += 1;
    };

  },
  parseMatch: function (matchFile) {
    const battleLog = this.getBattle(matchFile)
    var activeMons = {}; // note active mon using species as ID
    var lookups = {}; // for looking up species by name
    var lineups = {
      'p1': { 'name': null, 'mons': {} },
      'p2': { 'name': null, 'mons': {} }
    };

    // Set Lineups
    for (i in battleLog) {
      let who;
      switch (battleLog[i][0]) {
        case 'player':
          // Same as getPlayer()
          who = battleLog[i][1];
          lineups[who].name = battleLog[i][2].toString()
          break;
        case 'poke':
          who = battleLog[i][1];
          // split gender from species
          let pokemon = new Pokemon(this.getSpecies(battleLog[i]))
          lineups[who].mons[pokemon.species] = pokemon; // add species as attribute with key being species
          break;
        case 'teampreview':
          break;
        case 'switch':
        case 'drag':
        case 'replace':
          this.switchMon(activeMons, lookups, battleLog[i], lineups);
          break;
        case 'move':
          if (battleLog[i][4] === '[still]') {
            console.log('charging attack, nothing happens')
            break;
          } else {
            this.move(lineups, lookups, battleLog[i]);
            break;
          }
        // TODO [refactor] - refactor move and -anim cases into one cascading case?
        case '-anim':
          this.move(lineups, lookups, battleLog[i]);
        case 'faint':
          this.knockout(activeMons, lineups, lookups, battleLog[i]);
      }
    }
    return lineups;
  }
}