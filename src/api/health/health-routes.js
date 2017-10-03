'use strict';
const express = require('express');

var HealthRoute = {

  getRoutes: function () {
    var app = express();

    app.get('/ping', function (req, res) {
      res.status(200).json({status: 'pong'});
    });

    return app;
  }
};

module.exports = HealthRoute;
