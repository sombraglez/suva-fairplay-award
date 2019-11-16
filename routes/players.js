let express = require('express');
let router = express.Router();
let db = require('./config/database');


/* GET players listing. */
router.get('/', function (req, res, next) {
    db.many('SELECT * from player')
        .then(function (data) {
            res.render('players', {"players": data});
        })
        .catch(function (error) {
            console.log('ERROR:', error);
        })
});

/* GET player by id*/
router.get('/:id', function (req, res, next) {
    db.one('SELECT * from player where id=$1', req.params.id)
        .then(function (data) {
            res.render('player', {"player": data});
        })
        .catch(function (error) {
            console.log('ERROR:', error);
        })
});

router.post('/:id/fairplayed', function (req, res, next) {
    const fairplayfeedback = db.one('INSERT INTO game_player_feedback (player_id, game_id) VALUES($1, $2) RETURNING id', [req.params.id, 1]);
    res.end("Fairplay saved", fairplayfeedback);
});


module.exports = router;
