const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({"Todo": "make this work"});
})

router.post('/register', (req, res) => {
  if(!req.body.username || !req.body.password){
    res.status(400).send({msg: "Need a username AND a password. Try again, champ"});
  }
  else {
    /* 
    // Register
    */
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