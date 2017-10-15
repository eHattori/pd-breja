import PdvBusiness from './pdv-business';

export default class PdvController {
  constructor (business) {
    /* istanbul ignore next */
    this._business = !business ? new PdvBusiness() : business;
  }

  getById (id, callback) {
    var _this = this;
    this._business.getById(id, function (err, pdv) {
      _this.bindReturn(err, pdv, callback);
    });
  }

  getClosestPdv (lng, lat, callback) {
    var _this = this;
    this._business.getClosestPdv(lng, lat, function (err, pdv) {
      _this.bindReturn(err, pdv, callback);
    });
  }

  createPdv (obj, callback) {
    var _this = this;
    this._business.createPdv(obj, function (err, pdv) {
      _this.bindReturn(err, pdv, callback);
    });
  }

  bindReturn(err, pdv, callback) {
    var result = {
        pdvs: []
      };

      if (err) result.error = err;
      if (pdv) result.pdvs.push(pdv);

      callback(result);
  }
}
