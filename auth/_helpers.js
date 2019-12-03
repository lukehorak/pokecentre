require('dotenv').config();
const ENV = process.env.ENV || 'development';

const bcrypt = require('bcrypt')

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const authHelpers = require('./_helpers');

function comparePass(userPassword, dbPassword) {
  return bcrypt.compareSync(userPassword, dbPassword);
}

function createUser (req) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  return knex('users')
    .insert({
      email: req.body.email,
      password: hash
    })
    .returning('*');
}

function loginRequired(req, res, next) {
  if(!req.user) return res.status(401).json({status: "Please Log In"});
  return next();
}

module.exports = {
  comparePass,
  createUser,
  loginRequired
}