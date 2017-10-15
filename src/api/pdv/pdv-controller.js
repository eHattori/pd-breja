import PdvBusiness from './pdv-business';

export default class PdvController {
  constructor (business) {
    this._business = !business ? new PdvBusiness() : business;
  }

  getById (id, callback) {
    this._business.getById(id, function (err, pdv) {
      var result = {
        pdvs: []
      };

      if (err) result.error = err;
      if (pdv) result.pdvs.push(pdv);

      callback(result);
    });
  }

   getClosestPdv (lng, callback) {
    this._business.getClosestPdv(lng, lat, function (err, pdv) {
      var result = {
        pdvs: []
      };

      if (err) result.error = err;
      if (pdv) result.pdvs.push(pdv);

      callback(result);
    });
  }

  createPdv (obj, callback) {
    this._business.createPdv(obj, function (err, pdv) {
      var result = {
        pdvs: []
      };

      if (err) result.error = err;
      if (pdv) result.pdvs.push(pdv);

      callback(result);
    });
  }
}
