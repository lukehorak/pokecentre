const pools = new Pool ({
  user:'pl_user',
  host: 'localhost',
  database: 'pokelitics',
  password: 'farts',
  port: 5432
});

pools.query("SELECT * FROM leagues", (req, res) => {
  console.log(res);
});

pools.query('INSERT INTO bans (league_guid, moves, items, pokemon, abilities) VALUES ($1, $2, $3, $4, $5)', [guid, moves, items, pokemon, abilities], (err, res) => {
  if (err){
    throw(err);
  }
   return res;
})

// define guid first!

pools.query("SELECT * FROM bans WHERE league_guid = $1", [guid], (error, response) => {
  if (error) {
    throw(error);
  }
    console.log(response.rows[0]);
});