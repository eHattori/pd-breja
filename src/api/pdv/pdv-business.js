import PdvModel from './pdv-model'

export default class PdvBusiness {

    constructor(){
        this._model = new PdvModel();
    }

    getById(id, callback){
        this._model.getById(id).then((pdv) =>{                        
            callback(null, pdv);
        }, (err) => { callback(err); });
    }
}