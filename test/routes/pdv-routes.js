'use strict';
import PdvController from '../../src/api/pdv/pdv-controller';
import PdvRoutes from '../../src/api/pdv/pdv-routes';
import express from 'express';
import should from 'should';
import sinon from 'sinon';

describe('Test PdvRoutes', function () {

    var pdvApp;
    var request;

    before(function(done){        

        pdvApp = new PdvRoutes(express, new PdvController({}));
        request = require('supertest')(pdvApp.getApp());
        done();
    });

    it('Should return status 404 when send a ID that not exist', function(done){
        
        var stubController = sinon.stub(pdvApp._controller, 'getById').callsFake(function(id, callback){            
            callback({ pdvs : []});
        });

        request.get('/1')
            .expect(404)
            .end(function(err, res) {
                stubController.restore();
                (res.statusCode == 404).should.be.true();
                done(err);
        });
    });

    it('Should return status 200 when find a PDV with id', function(done){
        
        var stubController = sinon.stub(pdvApp._controller, 'getById').callsFake(function(id, callback){            
            callback({ pdvs : [ { id: "1" }]});
        });

        request.get('/1')
            .expect(200)
            .end(function(err, res) {
                stubController.restore();
                (res.statusCode == 200).should.be.true();                
                done(err);
        });
    });


    it('Should return status 400 when find a PDV with some error', function(done){
        
        var stubController = sinon.stub(pdvApp._controller, 'getById').callsFake(function(id, callback){            
            callback({ pdvs : [], error : [ 'SOME ERROR']});
        });

        request.get('/1')
            .expect(400)
            .end(function(err, res) {
                stubController.restore();
                (res.statusCode == 400).should.be.true();                
                done(err);
        });
    });


    it('Should return status 500 when occur some error', function(done){
        
        var stubController = sinon.stub(pdvApp._controller, 'getById').throws("Exception");

        request.get('/1')
            .expect(500)
            .end(function(err, res) {
                stubController.restore();
                (res.statusCode == 500).should.be.true();                
                done(err);
        });
    });

});
