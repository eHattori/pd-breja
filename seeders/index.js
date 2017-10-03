var pdvsData = require('./pdvs.json');
var mongoImport = require('mongoimport');
var config = require('../config/mongodb.js');

var conf = {
  fields: pdvsData.pdvs,
  db: config.databaseName,
  collection: 'pdvs',
  host: config.databaseHost + ':' + config.databasePort,
  username: config.databaseUser,
  password: config.databasePassword,
  callback: (err, db) => {
    if (err) { console.log(err); } else { console.log('===> Migration executed...'); }
  }
};

mongoImport(conf);
