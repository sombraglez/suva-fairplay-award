var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')(/* options */);
const cn = {
  host: 'db-suva-fairplay.postgres.database.azure.com',
  port: 5432,
  database: 'suvafairplay',
  user: 'adminsuva@db-suva-fairplay.postgres.database.azure.com',
  password: 'be4PWLvPZ3gdKF5H',
  ssl: true
};

var db = pgp(cn);

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.many('SELECT * from player')
      .then(function (data) {
        res.render('players', {"players" : data});
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      })
});

router.get('/:id', function(req, res, next){
    db.one('SELECT * from player where id=$1', req.params.id)
        .then(function (data) {
            res.render('player', {"player" : data});
        })
        .catch(function (error) {
            console.log('ERROR:', error);
        })
});

module.exports = router;
