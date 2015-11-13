var bodyParser = require('body-parser');
var Gathering = require(__dirname + '/../models/gathering.js');

module.exports = function(router) {
  router.use(bodyParser.json());

  router.route('/gatherings')

  .get(function(req, res) {
    Gathering.find({}, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error finding gatherings', error: err});
      } else {
        res.json({success: true, msg: 'retrieved all gatherings', data: data});
      }
    })
  })

  .post(function(req, res) {
    Gathering.create(req.body, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error creating gathering', error: err});
      } else {
        res.json({success: true, msg: 'stored a gathering', data: data});
      }
    })
  });

  router.route('/gatherings/:id')

  .get(function(req, res) {
    Gathering.findOne({name: req.params.id}, function(err, data) {
      if (err) {
          res.status(500).json({success: false, msg: 'Error finding gathering', error: err});
      } else {
        console.log(data);
        res.json({success: true, msg: 'found a gathering', data: data});
      }
    })
  })

  .put(function(req, res) {
    Gathering.findOneAndUpdate({name: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err) {
          res.status(500).json({success: false, msg: 'Error changing gathering', error: err});
      } else {
        console.log(data);
        res.json({success: true, msg: 'changed a gathering', data: data});
      }
    })
  })

  .delete(function(req, res) {
    Gathering.remove({name: req.params.id}, function(err, data) {
      if (err) {
          res.status(500).json({success: false, msg: 'Error finding gathering', error: err});
      } else {
        console.log(data);
        res.json({success: true, msg: 'deleted a gathering', data: data});
      }
    })
  })

}
