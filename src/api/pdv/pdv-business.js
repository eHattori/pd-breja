import PdvModel from './pdv-model';
import logger from '../../utils/logger';

export default class PdvBusiness {
  constructor (model) {
    if (!model) {
      this._model = new PdvModel();
    } else {
      this._model = model;
    }
  }

  getById (id, callback) {
    var start = new Date();
    this._model.getById(id).then((pdv) => {
      var end = new Date() - start;
      logger.info('==> BUSINESS.getById ID: ' + id + ' TIME: %dms ', end);

      callback(null, pdv);
    }, (err) => { callback(err); });
  }

  createPdv (obj, callback) {
    var start = new Date();
    this._model.create(obj).then((pdv) => {
      var objPdv = {
        tradingName: pdv.tradingName,
        ownerName: pdv.ownerName,
        document: pdv.document,
        id: pdv.id
      };

      var end = new Date() - start;
      logger.info('==> BUSINESS.createPdv TIME: %dms ', end);

      callback(null, objPdv);
    }, (err) => {
      var errors = [];

      if (err.name === 'ValidationError') {
        errors = err.message.toString().split(', ');
      } else if (err.message.indexOf('duplicate key error') !== -1) {
        errors = ['document: "{DOCUMENT}" already exist'.replace('{DOCUMENT}', obj.document)];
      } else {
        errors = [err];
      }

      callback(errors);
    });
  }

  getClosestPdv (lng, lat, callback) {
    var start = new Date();
    var errors = [];

    // valid the longitude and latitude values
    if (isNaN(lng) || isNaN(lat)) {
      errors.push('Longitude or Latitude should be Number');
    } else {
      if (lng < -180 || lng > 180) { errors.push('Longitute is out of bounds (-180, +180)'); }

      if (lat < -90 || lat > 90) { errors.push('Latitude is out of bounds (-90, +90)'); }
    }

    if (errors.length > 0) { return callback(errors); }

    this._model.getClosestPdv(lng, lat).then((pdv) => {
      var end = new Date() - start;
      logger.info('==> BUSINESS.getClosestPdv TIME: %dms ', end);

      callback(null, pdv);
    }, (err) => {
      callback(err);
    });
  }
}
