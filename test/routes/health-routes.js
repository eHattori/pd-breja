'use strict';
import HealthRoute from '../../src/api/health/health-routes';
import express from 'express';

describe('Test HealthRoutes', function () {

    var healthApp;
    var request;
    var should;    

    before(function(done){        

        healthApp = new HealthRoute(express);
        should = require('should');
        request = require('supertest')(healthApp.getApp());
        done();
    });

    it('Should return pong with status 200', function(done){
        request.get('/ping')
            .expect(200)
            .end(function(err, res) {
                (res.statusCode == 200).should.be.true();
                done(err);
            });
    });
});
