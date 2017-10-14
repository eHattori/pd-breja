import mongoose from 'mongoose';
import config from '../api/config';

export default class MongoDbConnection {
  constructor () {
    try {
      var options = {
        useMongoClient: true,
        poolSize: 5
      };

      mongoose.Promise = require('promise');
      
      var uri = 'mongodb://' + config.mongoConfig.databaseHost + '/' + config.mongoConfig.databaseName;
      this._conn = mongoose.connect((config.mongoConfig.mongoUri !== '' ? config.mongoConfig.mongoUri : uri), options);
      
    } catch (error) {
      this._conn = null;
    }
  }

  getDb () {
    return this._conn;
  }
}
