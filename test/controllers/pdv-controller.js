'use strict';
import PdvController from '../../src/api/pdv/pdv-controller';
import PdvBusiness from '../../src/api/pdv/pdv-business';
import should from 'should';
import sinon from 'sinon';

describe('Test PdvController', function () {

    var pdvController;

    before(function(done){

        pdvController = new PdvController(new PdvBusiness({}));        
        done();
    });

    it('Should return { pdvs : [] } when PDV nod found', function(done){

        var stub = sinon.stub(pdvController._business, 'getById').callsFake(function(id, callback){            
            callback(null);
        });

        pdvController.getById("0", function(result){            
            stub.restore();
            (result.pdvs.length == 0).should.be.true();
            done();
        });
        
    });

    it('Should return { pdvs : [ ... ] } when PDV found', function(done){

        var stub = sinon.stub(pdvController._business, 'getById').callsFake(function(id, callback){            
            callback(null, {
                id: '1',
                tradingName: 'Adega Osasco',
                ownerName: 'Ze da Ambev',
                document: '02.453.716/000170',
                coverageArea: [Object],
                address: [Object] 
            });
        });

        pdvController.getById("1", function(result){
            stub.restore();
            (result.pdvs.length == 1).should.be.true();
            done();
        });        
    });

    it('should return a new PDV inserted',function(done){

        var stub = sinon.stub(pdvController._business, 'createPdv').callsFake(function(obj, callback){            
            callback(null,
                { 
                    tradingName: 'Adega da Cerveja - Pinheiros',
                    ownerName: 'Zé da Silva',
                    document: '36167948895',
                    id: '1' }
                );
        });       

        var obj = { 
            "tradingName": "Adega da Cerveja - Pinheiros",
            "ownerName": "Zé da Silva",
            "document": "36167948895",
            "coverageArea": { 
            "type": "MultiPolygon", 
                "coordinates": [
                    [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
                    [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
                ]
            }, 
            "address": { 
                "type": "Point",
                "coordinates": [-46.57421, -21.785741]
            }, 
        }
        pdvController.createPdv(obj, function(result){
            stub.restore();
            (result.pdvs.length == 1).should.be.true();
            done();
        });
    });

});
