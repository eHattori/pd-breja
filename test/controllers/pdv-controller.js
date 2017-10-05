'use strict';
import PdvController from '../../src/api/pdv/pdv-controller';
import PdvBusiness from '../../src/api/pdv/pdv-business';
import should from 'should';
import sinon from 'sinon';

describe('Test PdvController', function () {

    var pdvController;
    var pdvBusiness;
    var objMock = {
        id: '1',
        tradingName: 'Adega Osasco',
        ownerName: 'Ze da Ambev',
        document: '02.453.716/000170',
        coverageArea: [Object],
        address: [Object] 
    }

    before(function(done){        

        pdvController = new PdvController();        
        done();
    });

    it('Should return { pdvs : [] } when PDV nod found', function(done){

        pdvController._business.getById = function(id, callback){            
            callback(null);
        }

        pdvController.getById("0", function(result){            
            (result.pdvs.length == 0).should.be.true();
            done();
        });
        
    });

    it('Should return { pdvs : [ ... ] } when PDV found', function(done){

        pdvController._business.getById = function(id, callback){                
            callback(null, objMock);
        }

        pdvController.getById("1", function(result){
            (result.pdvs.length == 1).should.be.true();
            done();
        });
        
    });
});
