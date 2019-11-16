var express = require('express');
var router = express.Router();
var db = require('./config/database');

/* GET players listing. */
router.get('/', function(req, res, next) {
  db.many('SELECT * from game')
    .then(function(data) {
      res.render('games', { games: data });
    })
    .catch(function(error) {
      console.log('ERROR:', error);
    });
});

/* GET game by id*/
router.get('/:id', function(req, res, next) {
  db.one('SELECT * from game where id=$1', req.params.id)
    .then(function(data) {
      res.render('game', { game: data });
    })
    .catch(function(error) {
      console.log('ERROR:', error);
    });
});

router.get('/:gameId/team/:teamId/fairplayed', function(req, res) {
  db.one('INSERT INTO game_team_feedback (team_id, game_id) VALUES($1, $2)', [
    req.params.teamId,
    req.params.gameId
  ]);
  res.render('bestplayer', { gameId: req.params.gameId });
});

router.get('/:gameId/bestplayer', function(req, res) {
  res.render('bestplayer', { gameId: req.params.gameId });
});

router.get('/:gameId/bestplayer/', function(req, res) {
  //TODO: remove fake data
  let data = [{ firstName: 'Michel', lastName: 'Aebischer' }];
  res.render('bestplayer', { bestplayer: req.params.gameId });
});

module.exports = router;
