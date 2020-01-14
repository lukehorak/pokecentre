require('dotenv').config();
const ENV = process.env.ENV || 'development';

const bcrypt = require('bcrypt');

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);


function comparePass(userPassword, dbPassword) {
  return bcrypt.compareSync(userPassword, dbPassword);
}

function createUser (req) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  return knex('users')
    .insert({
      username: req.body.username,
      password: hash
    })
    .returning('*');
}

function loginRequired(req, res, next) {
  if(!req.user) return res.status(401).json({status: "Please Log In"});
  return next();
}

function adminRequired(req, res, next) {
  if (!req.user) res.status(401).json({status: 'Please log in'});
  return knex('users').where({username: req.user.username}).first()
  .then((user) => {
    if (!user.admin) res.status(401).json({status: 'You are not authorized'});
    return next();
  })
  .catch((err) => {
    res.status(500).json({status: 'Something bad happened'});
  });
}

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    {status: 'You are already logged in'});
  return next();
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  adminRequired,
  loginRedirect
}