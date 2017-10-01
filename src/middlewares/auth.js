const config = require('../api/config');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

var auth = function (req, res, next) {
  var token = req.headers['authorization'];

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      logger.error('==> Authentication Error: 401');
      return res.status(401).send('missing authorization header');
    } else {
      next();
    }
  });
};

module.exports = auth;
