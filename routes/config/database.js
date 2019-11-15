//require database URL from properties file
var dbConfiguration = require('./properties');
var pgp = require('pg-promise')(/* options */);

var dbConnection = pgp(dbConfiguration);

module.exports = dbConnection;
