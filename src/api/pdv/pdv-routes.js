import PdvController from './pdv-controller';
import bodyParser from 'body-parser';

export default class PdvRoutes {
  constructor (express, controller) {
    this.express = express;
    this._controller = !controller ? new PdvController() : controller;
  }

  getApp () {
    var app = this.express();

    app.use(bodyParser.json())
       .use(bodyParser.urlencoded({ extended: true }));

    app.use('/', (req, res) => {
      this._controller.getClosestPdv(req.params.lng, req.params.lat, function (result) {
        try {
          var status = result.pdvs.length > 0 ? 200 : (result.error ? 400 : 404);
          res.status(status).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    });

    app.get('/:id', (req, res) => {
      this._controller.getById(req.params.id, function (result) {
        try {
          var status = result.pdvs.length > 0 ? 200 : (result.error ? 400 : 404);
          res.status(status).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    });

    app.post('/', (req, res) => {
      this._controller.createPdv(req.body, function (result) {
        try {
          var status = result.pdvs.length > 0 ? 201 : 400;
          res.status(status).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    });

    return app;
  }
}
