var express = require('express');
var router = express.Router();
var db = require('./config/database');

/* GET team listing. */
router.get('/', function (req, res, next) {
    db.many('SELECT * from team')
        .then(function (data) {
            res.render('teams', {"teams": data});
        })
        .catch(function (error) {
            console.log('ERROR:', error);
        })
});

/* GET team by id*/

router.get('/:id', function (req, res, next) {
    db.one('SELECT * from team where id=$1', req.params.id)
        .then(function (data) {
            res.render('team', {"team": data});
        })
        .catch(function (error) {
            console.log('ERROR:', error);
        })
});

module.exports = router;
