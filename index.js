const express = require('express');
const path = require('path');
const busboy = require('connect-busboy');
const fs = require('fs');

const getHighlights = require('./getHighlights.js');

process.on('uncaughtException', function (error) {
  console.log(error.stack);
});

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(busboy());

app.post('/api/upload', (req, res) => {

    let fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
      console.log(`Uploading ${filename}`);
      let tempPath = `${__dirname}/../data/tmp/tmpfile.html`
      fstream = fs.createWriteStream(tempPath);
      file.pipe(fstream);
      fstream.on('close', function (){
        let matchHighlights = getHighlights.main(tempPath);
        res.json(matchHighlights);
      })
    })
  //res.status(500).send();

});

app.get('/api/testData', (req, res) => {
  var data = getHighlights.testData;
  res.json(data);
})

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Pokecentre is listening on port ${port}`);