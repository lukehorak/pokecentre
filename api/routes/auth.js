const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({"Todo": "make this work"});
})

module.exports = router;