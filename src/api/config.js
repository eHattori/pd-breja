var config = require('../../config/mongodb');

module.exports = {
  'secret': process.env.SECRET_TOKEN || 'abcdefghijklmnopqrstuvxzwy',
  'logLevel': process.env.LOG_LEVEL || 'debug',
  'mongoConfig' : config
};
