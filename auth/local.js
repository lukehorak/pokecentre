require('dotenv').config();
const ENV = process.env.ENV || 'development';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const authHelpers = require('./_helpers');

const options = {};

init();

passport.use(new LocalStrategy(options, (email, password, done) => {
  knex('users').where({email}).first()
    .then((user) => {
      if(!user) return done(null, false);
      if(!authHelpers.comparePass(password, user.password)) {
        return done(null, false);
      }
      else {
        return done(null, user);
      }
    })
    .catch((err) => {return done(err);});
}))

module.exports = passport;