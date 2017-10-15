'use strict';
import PdvBusiness from '../../src/api/pdv/pdv-business';
import sinon from 'sinon';
import should from 'should';

describe('Test PdvBusiness', function () {

    var business;
    var should;

    before(function(done){        

        business = new PdvBusiness();
        done();
    });

    it('Should return a Array with errors when try insert invalid object', function(done){        
        business.createPdv({}, function(errors){
            (errors.length > 0).should.be.true();
            done();
        });
    });

    it('Should return a Array with errors when try insert object with document invalid', function(done){        
        business.createPdv({document: '123'}, function(errors){
            (errors.indexOf('document: 123 is not a valid document') != -1).should.be.true();
            done();
        });
    });

    it('Should return a Array with errors when try insert object with duplicate document', function(done){        
        
        var stub = sinon.stub(business._model, 'create').rejects({ message: "duplicate key error"});

        business.createPdv({document: '123'}, function(errors){
            stub.restore();
            (errors.indexOf('document: "123" already exist') != -1).should.be.true();
            done();
        });
    });

    it('Should return a pdv when', function(done){        

        var stub = sinon.stub(business._model, 'create').resolves({ 
                    tradingName: 'Adega da Cerveja - Pinheiros',
                    ownerName: 'Zé da Silva',
                    document: '36167948895',
                    id: '1' });
        
        business.createPdv({document: '123'}, function(err, pdv){
            stub.restore();
            (pdv.id == 1).should.be.true();            
            done();
        });
    });

    it('Should return a PDV that closest to it and that meets the same, according to its coverage area',function(done){

        var stub = sinon.stub(business._model, 'getClosestPdv').resolves(           
                [ { _id: '59e2978bb3dee11c1f7d818e',
                    id: '1',
                    tradingName: 'Adega Osasco',
                    ownerName: 'Ze da Ambev',
                    document: '02.453.716/000170',
                    coverageArea: { coordinates: [], type: 'MultiPolygon' },
                    address: { coordinates: [], type: 'Point' } } ]
        );

        business.getClosestPdv(-43.36556, -22.99669,function(err, pdv){
            stub.restore();
            (pdv !== null).should.be.true();            
            done();
        });
    });

    it('Should return error when pass wrong longitude to getClosestPdv', function(done){
        business.getClosestPdv(-181, -91, function(err,pdv){
            (err.length == 2).should.be.true();
            done();
        });
    });

    it('Should return a PDV in getById',function(done){

        var stub = sinon.stub(business._model, 'getById').resolves(           
                [ { _id: '59e2978bb3dee11c1f7d818e',
                    id: '1',
                    tradingName: 'Adega Osasco',
                    ownerName: 'Ze da Ambev',
                    document: '02.453.716/000170',
                    coverageArea: { coordinates: [], type: 'MultiPolygon' },
                    address: { coordinates: [], type: 'Point' } } ]
        );

        business.getById(1, function(err, pdv){
            stub.restore();
            (pdv !== null).should.be.true();            
            done();
        });
    });

});
