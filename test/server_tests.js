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

  before(function(done) {
    Gathering.create({name: 'thanksgiving'});
    done();
  })

  it('should be able to get gatherings', function(done) {
    chai.request(url)
      .get('/gatherings')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('retrieved all gatherings');
        done();
      });
  });

  it('should be able to create a gathering', function(done) {
    chai.request(url)
      .post('/gatherings')
      .send({'name': 'testing'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('stored a gathering');
        done();
      });
  });

  it('should be able to get a gathering', function(done) {
    chai.request(url)
      .get('/gatherings/thanksgiving')
      .end(function(err, res) {
        console.log(res);
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('found a gathering');
        expect(res.body.data.name).to.eql('thanksgiving');
        done();
      });
  });

  it('should be able to modify a gathering', function(done) {
    chai.request(url)
      .put('/gatherings/thanksgiving')
      .send({'name': 'christmas'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('changed a gathering');
        expect(res.body.data.name).to.eql('christmas');
        done();
      });
  });

  it('should be able to delete a gathering', function(done) {
    chai.request(url)
      .delete('/gatherings/christmas')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('deleted a gathering');
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
      .send({'dish': 'pie', 'chef': 'swedish'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to modify a dish', function(done) {
    chai.request(url)
      .put('/dishes/pie')
      .send({'chef': 'ramsey'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to delete a dish', function(done) {
    chai.request(url)
      .delete('/dishes/pie')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        done();
      });
  });

});
