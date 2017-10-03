'use strict';
import HealthRoute from '../../src/api/health/health-routes';
import express from 'express';

describe('Test HealthRoutes', function () {

    var healthApp;
    var request;
    var token;
    var config;
    var jwt;
    var should;    

    before(function(done){        

        healthApp = new HealthRoute(express);
        config = require('../../src/api/config.js');
        should = require('should');
        request = require('supertest')(healthApp.getApp());
        jwt = require('jsonwebtoken');
        token = jwt.sign({ foo: 'bar' }, config.secret, { algorithm: 'HS256' });
        done();
    });

    it('Should return pong with status 200', function(done){
        request.get('/ping')
            .expect(200)
            .set("Authorization", token)
            .end(function(err, res) {
                (res.statusCode == 200).should.be.true();
                done(err);
            });
    });
});
