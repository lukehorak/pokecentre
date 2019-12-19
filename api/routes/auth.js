const express = require('express');
const router = express.Router();

const authHelpers = require('../../auth/_helpers');
const passport = require('../../auth/local');


router.post('/register', (req, res) => {
  authHelpers.createUser(req, res)
    .then((user) => {
      handleLogin(res, user[0]);
    })
    .then(() => { handleResponse(res, 200, 'success'); })
    .catch((err) => { handleResponse(res, 500, 'error')});
})

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if(!user) { handleResponse(res, 404, 'User not found!')};
    if(user) {
      req.logIn(user, function(err) {
        if(err) { handleResponse(res, 500, 'error')};
        handleResponse(res, 200, 'success');
      })
    }
  })(req, res, next);
})

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
})

function handleResponse(res, code, message) {
  res.status(code).json({status: message})
}


module.exports = router;