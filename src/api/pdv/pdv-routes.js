import PdvController from './pdv-controller';
import bodyParser from 'body-parser';
import logger from '../../utils/logger';

export default class PdvRoutes {
  constructor (express, controller) {
    this.express = express;
    /* istanbul ignore next */
    this._controller = !controller ? new PdvController() : controller;
  }

  getApp () {
    var app = this.express();

    app.use(bodyParser.json())
       .use(bodyParser.urlencoded({ extended: true }));

    app.get('/:id', (req, res) => {
      logger.info('==> Routes: PDV - ID: ' + req.params.id);
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
      logger.info('==> Routes: PDV - POST');
      this._controller.createPdv(req.body, function (result) {
        try {
          var status = result.pdvs.length > 0 ? 201 : 400;
          res.status(status).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    });

    app.use('/', (req, res) => {
      logger.info('==> Routes: PDV - LNG: ' + req.query.lng + ' LAT: ' + req.query.lat);
      this._controller.getClosestPdv(req.query.lng, req.query.lat, function (result) {
        try {
          var status = result.pdvs.length > 0 ? 200 : (result.error ? 400 : 404);
          res.status(status).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    });

    return app;
  }
}
