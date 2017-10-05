import Mongodb from '../../infrastructure/mongodb';
import PdvSchema from './pdv.schema';

export default class PdvModel {

    constructor(){
        this._db = new Mongodb().getDb();
        this._schema = new PdvSchema();
        this._model = this._db.model('pdvs', this._schema.getSchema());
    }

    getById(id){            
        return this._model.findOne({'id': id.toString()},{'_id': false});
    }

}