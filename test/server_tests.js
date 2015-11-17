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
require(__dirname + '/../server.js');

describe('gathering resource', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  beforeEach(function(done) {
      var testGathering = new Gathering({name: 'testgiving'});
      testGathering.save(function(err, data) {
        if (err) throw err;
        this.testGathering = data;
        done();
      }.bind(this));
    });

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
      .get('/gatherings/' + this.testGathering._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('found a gathering');
        expect(res.body.data.name).to.eql('testgiving');
        done();
      });
  });

  it('should be able to modify a gathering', function(done) {
    chai.request(url)
      .put('/gatherings/' + this.testGathering._id)
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
      .delete('/gatherings/' + this.testGathering._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('deleted a gathering');
        done();
      });
  });

});

describe('dish resource', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  beforeEach(function(done) {
    var testGathering = new Gathering({name: 'testmas'});
    var testDish = new Dish({dish: 'cake', chef: 'glados', votes: '5'});
    testGathering.dishes.push(testDish._id);
    testDish.save(function(err, data) {
      if (err) throw err;
    });
    testGathering.save(function(err, data) {
      if (err) throw err;
      this.testGathering = data;
      done();
    }.bind(this));
  });

  it('should be able to get dishes', function(done) {
    chai.request(url)
      .get('/gatherings/' + this.testGathering._id + '/dishes')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('got some dishes');
        expect(res.body.data[0].dish).to.eql('cake');
        done();
      });
  });

  it('should be able to create dishes', function(done) {
    chai.request(url)
      .post('/gatherings/' + this.testGathering._id + '/dishes')
      .send({'dish': 'pie', 'chef': 'swedish'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('created a new dish');
        expect(res.body.data.dishes.length).to.eql(2);
        done();
      });
  });

  it('should be able to get a dish', function(done) {
    chai.request(url)
      .get('/gatherings/' + this.testGathering._id + '/dishes/' + this.testGathering.dishes[0])
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('got a dish');
        expect(res.body.data.dish).to.eql('cake');
        done();
      });
  });

  it('should be able to modify a dish', function(done) {
    chai.request(url)
      .put('/gatherings/' + this.testGathering._id +'/dishes/' + this.testGathering.dishes[0])
      .send({'chef': 'ramsey'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('changed a dish');
        expect(res.body.data.chef).to.eql('ramsey');
        done();
      });
  });

  it('should be able to delete a dish', function(done) {
    chai.request(url)
      .delete('/gatherings/' + this.testGathering._id + '/dishes/' + this.testGathering.dishes[0])
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.msg).to.eql('deleted a dish');
        done();
      });
  });

});
