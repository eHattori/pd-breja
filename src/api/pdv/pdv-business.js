import PdvModel from './pdv-model';

export default class PdvBusiness {
  constructor (model) {
    if (!model) {
      this._model = new PdvModel();
    } else {
      this._model = model;
    }
  }

  getById (id, callback) {
    this._model.getById(id).then((pdv) => {
      callback(null, pdv);
    }, (err) => { callback(err); });
  }

  createPdv (obj, callback) {
    this._model.create(obj).then((pdv) => {
      var objPdv = {
        tradingName: pdv.tradingName,
        ownerName: pdv.ownerName,
        document: pdv.document,
        id: pdv.id
      };

      callback(null, objPdv);
    }, (err) => {
      var errors = [];

      if (err.name === 'ValidationError') {
        errors = err.message.toString().split(', ');
      }

      if (err.message.indexOf('duplicate key error') !== -1) {
        errors = ['document: "{DOCUMENT}" already exist'.replace('{DOCUMENT}', obj.document)];
      }

      callback(errors);
    });
  }
}
