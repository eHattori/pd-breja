'use strict';
import logger from '../../utils/logger';

export default class HealthRoute {
  constructor (express) {
    this.express = express;
  }

  getApp () {
    var app = this.express();

    app.get('/ping', function (req, res) {
      logger.info('==> Routes: Health - Ping');
      res.status(200).json({status: 'pong'});
    });

    return app;
  }
}
