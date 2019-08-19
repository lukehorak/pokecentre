const express = require('express');
const path = require('path');
const busboy = require('connect-busboy');

// Require Routes
const uploadRoute = require('./api/routes/uploadRoute');
const testDataRoute = require('./api/routes/testData');
const pokedexRoute = require('./api/routes/pokedex');

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(busboy());

// Use Routes
app.use('/api/upload', uploadRoute);
app.use('/api/testData', testDataRoute);
app.use('/api/pokedex', pokedexRoute);


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3002;
app.listen(port);

console.log(`Pokecentre is listening on port ${port}`);