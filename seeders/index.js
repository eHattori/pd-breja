var pdvsData = require('./pdvs.json');
var config = require('../config/mongodb.js');

var mongoose = require('mongoose');

var options = {
  useMongoClient: true,
  poolSize: 5
};

mongoose.Promise = require('promise');

var uri = 'mongodb://' + config.databaseHost + '/' + config.databaseName;
var db = mongoose.connect((config.mongoUri !== '' ? config.mongoUri : uri), options);

var schema = new mongoose.Schema({
  id: { type: String, required: true },
  tradingName: {
    type: String,
    required: [true, 'PDV tradingName is required']
  },
  ownerName: {
    type: String,
    required: [true, 'PDV ownerName is required']
  },
  document: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-d{2}$/.test(v) || /^\d{11}$/.test(v));
      },
      message: '{VALUE} is not a valid document'
    },
    required: [true, 'PDV document is required']
  },
  coverageArea: {
    type: { type: String },
    coordinates: [[[[Number]]]]
  },
  address: {
    type: { type: String },
    coordinates: [Number]
  }
});

schema.index([{address: '2dsphere'}, {coverageArea: '2dsphere'}]);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var pdv = mongoose.model('pdvs', schema);

  pdv.init().then(function () {
    for (var i in pdvsData.pdvs) {
      pdv.collection.insert(pdvsData.pdvs[i], function (err, r) {
        if (err && err.message.indexOf('duplicate key error') !== -1) {
          console.log('Duplicate Document');
        } else {
          console.log('Row inserted!');
        }

        db.close();
      });
    }
  });
});
