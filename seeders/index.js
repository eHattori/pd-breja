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

// db.getCollection('pdvs').createIndex( { address : "2dsphere" } );
// db.getCollection('pdvs').createIndex( { coverageArea : "2dsphere" } );
// db.getCollection('pdvs').createIndex({ "document": 1 }, { unique: true });

/*
db.getCollection('pdvs').insert(
   {
      _id: "pdvid",
      seq: 51 //pegar ultimo valor
   }
)
*/

mongoImport(conf);
