var express = require('express');
var db = require('./config/database');

var router = express.Router();

/*var pgp = require('pg-promise')(/!* options *!/);

const cn = {
  host: 'db-suva-fairplay.postgres.database.azure.com',
  port: 5432,
  database: 'suvafairplay',
  user: 'adminsuva@db-suva-fairplay.postgres.database.azure.com',
  password: 'be4PWLvPZ3gdKF5H',
  ssl: true
};

var db = pgp(cn);*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/quiz', function(req, res, next) {
  res.render('playerquiz');
});


module.exports = router;
