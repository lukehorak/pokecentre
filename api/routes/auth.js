const express = require('express');
const router = express.Router();

// Env/Knex stuff TODO [low prio] clean this up into helper file?
require('dotenv').config();
const ENV = process.env.ENV || 'development';
const bcrypt = require('bcrypt');
const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);

router.get('/', (req, res) => {
  res.json({"Todo": "make this work"});
})

router.post('/register', (req, res) => {
  if(!req.body.username || !req.body.password){
    res.status(400).send({msg: "Need a username AND a password. Try again, champ"});
  }
  else {
    console.log(`registering user ${req.body.username}`)

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    knex('users')
      .insert({
        username: req.body.username,
        password: hash
      })
      .then( () => res.status(200).json({'status':'successful'}) )
    
  }
})

router.post('/login', (req, res) => {
  if(!req.body.username || !req.body.password){
    res.status(400).send({msg: "Need a username AND a password. Try again, champ"});
  }
  else {
    /* 
    // Do the Login thing
    */
  }
})

router.get('/logout', (req, res) => {
  if(!req.body.username){
    res.status(400).send({msg: "Can't log 'nobody' out. Try again old sport"});
  }
  else {
    /* 
    // Do the Login thing
    */
  }
})


module.exports = router;