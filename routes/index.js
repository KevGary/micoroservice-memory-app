var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = "postgres://@localhost/memoriesapp";

//GET ALL
router.get('/api/v1/memories', function(req, res, next) {
 pg.connect(conString, function(err, client, done) {
   if (err) {
     return console.error('error fetching client from pool', err);
   }
   console.log("connected to database");
   client.query('SELECT * FROM memories', function(err, result) {
     done();
     if (err) {
       return console.error('error running query', err);
     }
      res.send(result);
   });
 });
});

//INSERT ONE
router.post('/api/v1/memories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO memories(old_days, these_days, year) VALUES($1, $2, $3) returning id', ['used to play with toys', 'now i make toys', '1994'], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
      //output: 1 
    });
  });
})

//GET ALL/:YEAR
router.get('/api/v1/memories/:id', function(req ,res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    console.log(req.params)
    client.query('SELECT * FROM memories WHERE year = $1', ['1994'], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
       res.send(result);
    });
  });
})

router.get('')



module.exports = router;
