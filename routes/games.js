var express = require('express');
var router = express.Router();
var db = require('./config/database');

/* GET players listing. */
router.get('/', function(req, res, next) {
  db.many('SELECT * from player')
    .then(function(data) {
      res.render('games', { players: 'test' });
    })
    .catch(function(error) {
      console.log('ERROR:', error);
    });
});

/* GET player by id*/
router.get('/:id', function(req, res, next) {
  db.one('SELECT * from player where id=$1', req.params.id)
    .then(function(data) {
      res.render('games', { player: 'test' });
    })
    .catch(function(error) {
      console.log('ERROR:', error);
    });
});

router.post('/:id/fairest', function(req, res) {
  console.log('Fair play for :', req.params.id);
  res.end('yes');
});

module.exports = router;
