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
  //TODO: remove fake data
  let data = [
    { id: 4, firstName: 'Michel', lastName: 'Aebischer' },
    { id: 5, firstName: 'Nicolas', lastName: 'Moumi Ngamaleu' },
    { id: 6, firstName: 'Nicolas', lastName: 'Bürgy' },
    { id: 7, firstName: 'Vincent', lastName: 'Sierro' },
    { id: 8, firstName: 'Christian', lastName: 'Fassnacht' },
    { id: 9, firstName: 'Sandro', lastName: 'Lauper' },
    { id: 10, firstName: 'Marco', lastName: 'Wölfli' },
    { id: 11, firstName: 'Fabian', lastName: 'Lustenberger' },
    { id: 12, firstName: 'Jordan', lastName: 'Lotomba' }
  ];
  res.render('bestplayer', { gameId: req.params.gameId });
});

router.get('/:gameId/bestplayer/', function(req, res) {
  //TODO: remove fake data
  let data = [
    { id: 4, firstName: 'Michel', lastName: 'Aebischer' },
    { id: 5, firstName: 'Nicolas', lastName: 'Moumi Ngamaleu' },
    { id: 6, firstName: 'Nicolas', lastName: 'Bürgy' },
    { id: 7, firstName: 'Vincent', lastName: 'Sierro' },
    { id: 8, firstName: 'Christian', lastName: 'Fassnacht' },
    { id: 9, firstName: 'Sandro', lastName: 'Lauper' },
    { id: 10, firstName: 'Marco', lastName: 'Wölfli' },
    { id: 11, firstName: 'Fabian', lastName: 'Lustenberger' },
    { id: 12, firstName: 'Jordan', lastName: 'Lotomba' }
  ];
  res.render('bestplayerfeedback', {
    gameId: req.params.gameId,
    playerId: data[0].id
  });
});

router.post('/:gameId/bestplayer/:playerId', function(req, res) {
  res.render('bestplayersaved');
});

module.exports = router;
