import PdvBusiness from './pdv-business';


export default class PdvController {

    constructor(){
        this._business = new PdvBusiness();
    }

    getById(id, callback){
        
        this._business.getById(id, function(err, pdv){            

            var result = {
                pdvs : []
            };

            if(err) result.error =  err;
            if(pdv) result.pdvs.push(pdv);

            callback(result);
        });
    }

}
