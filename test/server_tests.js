'use strict'

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/dish_test';
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Dish = require(__dirname + '/../models/dish.js');
var Gathering = require(__dirname + '/../models/gathering.js');

describe('gathering resource', function() {

  it('should be able to get gatherings', function(done) {
    chai.request(url)
      .get('/gatherings')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to create a gathering', function(done) {
    chai.request(url)
      .post('/gatherings')
      .send({'name': 'thanksgiving'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to get a gathering', function(done) {
    chai.request(url)
      .get('/gatherings/test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to modify a gathering', function(done) {
    chai.request(url)
      .put('/gatherings/test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to delete a gathering', function(done) {
    chai.request(url)
      .delete('/gatherings/test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

});

describe('dish resource', function() {

  it('should be able to get dishes', function(done) {
    chai.request(url)
      .get('/dishes')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to create dishes', function(done) {
    chai.request(url)
      .post('/dishes')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to modify a dish', function(done) {
    chai.request(url)
      .put('/dishes/test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to delete a dish', function(done) {
    chai.request(url)
      .delete('/dishes/test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

});
