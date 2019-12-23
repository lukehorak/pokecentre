require('dotenv').config();

const express = require('express');
const path = require('path');
const busboy = require('connect-busboy');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');

const ENV = process.env.ENV || 'development';

// knex
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
//const knexLogger  = require('knex-logger');

// Configs
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(busboy());
// Passport
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Require Routes
const uploadRoute = require('./api/routes/uploadRoute');
const testDataRoute = require('./api/routes/testData');
const pokedexRoute = require('./api/routes/pokedex');
const authRoute = require('./api/routes/auth');
const userRoute = require('./api/routes/user');

// Use Routes
app.use('/api/upload', uploadRoute);
app.use('/api/testData', testDataRoute);
app.use('/api/pokedex', pokedexRoute);
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3002;
app.listen(port);

console.log(`Pokecentre is listening on port ${port}`);