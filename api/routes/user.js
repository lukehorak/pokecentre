const express = require('express');
const router = express.Router();

const authHelpers = require('../../auth/_helpers');

router.get('/', authHelpers.loginRequired, (req, res, next) => {
  handleResponse(res, 200, 'success');
})

function handleResponse(res, code, message) {
  res.status(code).json({status: message})
}


module.exports = router;