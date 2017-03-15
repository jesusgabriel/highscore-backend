var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Game = require('./app.js');
var db = 'mongodb://localhost/game';


mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/game', function(req, res){
Game.find({}).exec(function(err, game) {
  if (err) {
    console.log("The game not running");
  }else {
    console.log(game);
    res.json(game);
  }
})
});

app.post('/game', function(req, res){
  var newplayer = new Game ();
    newplayer.name = req.body.name,
    newplayer.score= req.body.score,
    newplayer.save(function (err, newplayer) {
      if (err) {
        console.log('error has ocurred');
      }else {
      res.json(newplayer)
      }
  })
});


app.listen(1000);
