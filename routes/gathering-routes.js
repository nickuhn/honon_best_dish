var bodyParser = require('body-parser');
var Gathering = require(__dirname + '/../models/gathering.js');
var Dish = require(__dirname + '/../models/dish.js');

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
      });
    })

    .post(function(req, res) {
      Gathering.create(req.body, function(err, data) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error creating gathering', error: err});
        } else {
          res.json({success: true, msg: 'stored a gathering', data: data});
        }
      });
    });

  router.route('/gatherings/:id')

    .get(function(req, res) {
      Gathering.findOne({_id: req.params.id}, function(err, data) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error finding gathering', error: err});
        } else {
          res.json({success: true, msg: 'found a gathering', data: data});
        }
      });
    })

    .put(function(req, res) {
      Gathering.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error changing gathering', error: err});
        } else {
          res.json({success: true, msg: 'changed a gathering', data: data});
        }
      });
    })

    .delete(function(req, res) {
      Gathering.remove({_id: req.params.id}, function(err, data) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error deleting gathering', error: err});
        } else {
          res.json({success: true, msg: 'deleted a gathering', data: data});
        }
      });
    });

  router.route('/gatherings/:id/dishes')

    .get(function(req, res) {
      Gathering.findOne({_id: req.params.id})
                .populate('dishes')
                .exec(function(err, gathering) {
                  if (err) {
                    res.status(500).json({success: false, msg: 'Error finding dishes', error: err});
                  } else {
                    res.json({success: true, msg: 'got some dishes', data: gathering.dishes});
                  }
                });
    })

    .post(function(req, res) {
      var dish = new Dish(req.body);
      Gathering.findOne({_id: req.params.id}, function(err, gathering) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error finding gathering while saving new dish', error: err});
        } else {
          gathering.dishes.push(dish._id);
          dish.save(function(err, dish) {
            if (err) {
              res.status(500).json({success: false, msg: 'Error saving new dish', error: err});
            } else {
              gathering.save(function(err, data) {
                if (err) {
                  res.status(500).json({success: false, msg: 'Error saving gathering after adding new dish', error: err});
                } else {
                  res.json({success: true, msg: 'created a new dish', data: data});
                }
              });
            }
          });
        }
      });
    });

  router.route('/gatherings/:id/dishes/:dish')

    .get(function(req, res) {
      Dish.findOne({_id: req.params.dish}, function(err, dish) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error finding dish', error: err});
        } else {
          res.json({success: true, msg: 'got a dish', data: dish});
        }
      });
    })

    .put(function(req, res) {
      Dish.findOneAndUpdate({_id: req.params.dish}, req.body, {new: true}, function(err, data) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error changing dish', error: err});
        } else {
          res.json({success: true, msg: 'changed a dish', data: data});
        }
      });
    })

    .delete(function(req, res) {
      Dish.remove({_id: req.params.dish}, function(err, data) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error deleting dish', error: err});
        } else {
          Gathering.findOne({_id: req.params.id}, function(err, gathering) {
            console.log(gathering.dishes);
            gathering.dishes.splice(gathering.dishes.indexOf(req.params.dish), 1);
            console.log(gathering.dishes);
            gathering.save(function(err, data) {
              if (err) {
                res.status(500).json({success: false, msg: 'Error saving gathering after deleting dish', error: err});
              } else {
                res.json({success: true, msg: 'deleted a dish', data: data});
              }
            });
          });
        }
      });
    });
};
