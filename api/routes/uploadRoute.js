const express = require('express');
const fs = require('fs');
const getHighlights = require('../../getHighlights.js');
const router = express.Router();

router.post('/', (req, res) => {

  let fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log(`Uploading ${filename}`);
    let tempPath = './data/tmp/tmpfile.html'
    fstream = fs.createWriteStream(tempPath);
    file.pipe(fstream);
    fstream.on('close', function (){
      try{
        let matchHighlights = getHighlights.main(tempPath);
        res.json(matchHighlights);
      }
      catch(e){
        res.status(500).send(e.stack)
      }
    })
  })

});

module.exports = router;