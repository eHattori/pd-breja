'use strict';

export default class HealthRoute {
  constructor (express) {
    this.express = express;
  }

  getRoutes () {
    var app = this.express();

    app.get('/ping', function (req, res) {
      res.status(200).json({status: 'pong'});
    });

    return app;
  }
}
