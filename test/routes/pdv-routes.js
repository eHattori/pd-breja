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

    // it('Should return status 404 when send a ID that not exist', function(done){
        
    //     var stubController = sinon.stub(pdvApp._controller, 'getById').callsFake(function(id, callback){            
    //         callback({ pdvs : []});
    //     });

    //     request.get('/1')
    //         .expect(404)
    //         .end(function(err, res) {
    //             stubController.restore();
    //             (res.statusCode == 404).should.be.true();
    //             done(err);
    //     });
    // });

    // it('Should return status 200 when find a PDV with id', function(done){
        
    //     var stubController = sinon.stub(pdvApp._controller, 'getById').callsFake(function(id, callback){            
    //         callback({ pdvs : [ { id: "1" }]});
    //     });

    //     request.get('/1')
    //         .expect(200)
    //         .end(function(err, res) {
    //             stubController.restore();
    //             (res.statusCode == 200).should.be.true();                
    //             done(err);
    //     });
    // });

    // it('Should return status 400 when find a PDV with some error', function(done){
        
    //     var stubController = sinon.stub(pdvApp._controller, 'getById').callsFake(function(id, callback){            
    //         callback({ pdvs : [], error : [ 'SOME ERROR']});
    //     });

    //     request.get('/1')
    //         .expect(400)
    //         .end(function(err, res) {
    //             stubController.restore();
    //             (res.statusCode == 400).should.be.true();                
    //             done(err);
    //     });
    // });

    // it('Should return status 500 when occur some error', function(done){
        
    //     var stubController = sinon.stub(pdvApp._controller, 'getById').callsFake(function(id, callback){            
    //         callback(null);
    //     });

    //     request.get('/1')
    //         .expect(500)
    //         .end(function(err, res) {
    //             stubController.restore();
    //             (res.statusCode == 500).should.be.true();                
    //             done(err);
    //     });
    // });

    // it('Should return status 400 when try create a wrong PDV', function(done){
        
    //     var stubController = sinon.stub(pdvApp._controller, 'createPdv').callsFake(function(obj, callback){            
    //         callback({ pdvs: [], error : ["SOME ERROR"]});
    //     });

    //     request.post('/')            
    //         .expect(400)
    //         .send({a : "a"})
    //         .end(function(err, res) {
    //             stubController.restore();
    //             (res.statusCode == 400).should.be.true();                
    //             done(err);
    //     });
    // });

    // it('Should return status 201 when try create a new PDV', function(done){
        
    //     var stubController = sinon.stub(pdvApp._controller, 'createPdv').callsFake(function(obj, callback){            
    //         callback({ pdvs: 
    //                     [ { tradingName: 'Adega da Cerveja - Pinheiros',
    //                         ownerName: 'Zé da Silva',
    //                         document: '36167948895',
    //                         id: '1' } ] }
    //             );
    //     });

    //     var obj = { 
    //         "tradingName": "Adega da Cerveja - Pinheiros",
    //         "ownerName": "Zé da Silva",
    //         "document": "36167948895",
    //         "coverageArea": { 
    //         "type": "MultiPolygon", 
    //             "coordinates": [
    //                 [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
    //                 [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    //             ]
    //         }, 
    //         "address": { 
    //             "type": "Point",
    //             "coordinates": [-46.57421, -21.785741]
    //         }, 
    //     }

    //     request.post('/')            
    //         .expect(201)
    //         .send(obj)
    //         .end(function(err, res) {
    //             stubController.restore();
    //             (res.statusCode == 201).should.be.true();                
    //             done(err);
    //     });
    // });

    //  it('Should return status 500 when occur some error in create PDV', function(done){
        
    //     var stubController = sinon.stub(pdvApp._controller, 'createPdv').callsFake(function(id, callback){            
    //         callback(null);
    //     });

    //     request.post('/')
    //         .expect(500)
    //         .end(function(err, res) {
    //             stubController.restore();
    //             (res.statusCode == 500).should.be.true();                
    //             done(err);
    //     });
    // });

    it('Should return status 500 when occur some error in / path to getClosestPdv', function(done){
        
        var stubController = sinon.stub(pdvApp._controller, 'getClosestPdv').callsFake(function(lng, lat, callback){            
            callback(null);
        });

        request.get('?lng=1&lat=1')
            .expect(500)
            .end(function(err, res) {
                stubController.restore();
                (res.statusCode == 500).should.be.true();                
                done(err);
        });
    });

     it('Should return status 200 when find a PDV in region to getClosestPdv', function(done){
        
        var stubController = sinon.stub(pdvApp._controller, 'getClosestPdv').callsFake(function(lng, lat, callback){            
            callback({pdvs: [{a : "a"}]});
        });

        request.get('?lng=1&lat=1')
            .expect(200)
            .end(function(err, res) {
                stubController.restore();
                (res.statusCode == 200).should.be.true();                
                done(err);
        });
    });

    it('Should return status 400 when some error in / path to getClosestPdv', function(done){
        
        var stubController = sinon.stub(pdvApp._controller, 'getClosestPdv').callsFake(function(lng, lat, callback){            
            callback({pdvs: [], error : ["SOME ERROR"]});
        });

        request.get('?lng=1&lat=1')
            .expect(400)
            .end(function(err, res) {
                stubController.restore();
                (res.statusCode == 400).should.be.true();                
                done(err);
        });
    });

    it('Should return status 404 when not found pdv in / path to getClosestPdv', function(done){
        
        var stubController = sinon.stub(pdvApp._controller, 'getClosestPdv').callsFake(function(lng, lat, callback){            
            callback({pdvs: []});
        });

        request.get('?lng=1&lat=1')
            .expect(404)
            .end(function(err, res) {
                stubController.restore();
                (res.statusCode == 404).should.be.true();                
                done(err);
        });
    });

});
