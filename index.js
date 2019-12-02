const express = require('express');
const path = require('path');
const busboy = require('connect-busboy');
const passport = require('passport');

// TODO - finish user auth config

// knex
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

// Require Routes
const uploadRoute = require('./api/routes/uploadRoute');
const testDataRoute = require('./api/routes/testData');
const pokedexRoute = require('./api/routes/pokedex');

// Configs
const app = express();
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

passport.serializeUser(function(user, done){
  done(null, user.id);

});
passport.deserializeUser(function(id, cb){
  knex('users')
    .where({id: id})
    .then(([user]) => {
      if (!user) { done (new Error('User not found, Whoops! id:' + id))}  
      done(null, user);
    })
})

// Session
app.use(session({
  secret: process.env.SECRET_KEY, //GENERATE SECRET
  resave: true,
  saveUninitialized: true,
  store: new FileStore({path: './data/tmp/session'})
}))
app.use(passport.initialize())
app.use(passport.session())

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