'use strict';
import PdvRoutes from '../../src/api/pdv/pdv-routes';
import express from 'express';

describe('Test PdvRoutes', function () {

    var pdvApp;
    var request;
    var should;    

    before(function(done){        

        pdvApp = new PdvRoutes(express);
        should = require('should');
        request = require('supertest')(pdvApp.getApp());
        done();
    });

    it('Should return status 404 when send a ID that not exist', function(done){
        //TO-DO: mock the controller to return null
        request.get('/1')
            .expect(404)
            .end(function(err, res) {
                (res.statusCode == 404).should.be.true();
                done(err);
        });
    });
});
