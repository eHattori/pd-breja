import Mongodb from '../../infrastructure/mongodb';
import PdvSchema from './pdv.schema';

export default class PdvModel {
  constructor () {
    this._db = new Mongodb().getDb();
    this._schema = new PdvSchema();
    this._model = this._db.model('pdvs', this._schema.getSchema());
  }

  /* istanbul ignore next */
  getById (id) {
    return this._model.findOne({'id': id.toString()}, {'_id': false});
  }

  /* istanbul ignore next */
  create (obj) {
    return this._model.find().count().then((count) => {
      obj.id = (count + 1).toString();
      var pdv = new this._model(obj);
      return pdv.save();
    });
  }

  /* istanbul ignore next */
  getClosestPdv (lng, lat) {
    var _this = this;
    return this._model.findOne({
      coverageArea: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: [ lng, lat ]
          }
        }
      }
    }).then((pdv) => {
      return _this._model.find({
        address: {
          $geoWithin: {
            $geometry: pdv.coverageArea
          }
        }
      });
    });
  }
}
