var bodyParser = require('body-parser');

module.exports = function(router) {
  router.use(bodyParser.json());

  router.route('/dishes')

  .get(function(req, res) {
    res.json({working: true});
  })

  .post(function(req, res) {
    res.json({working: true});
  });

  router.route('/dishes/test')

  .get(function(req, res) {
    res.json({working: true});
  })

  .put(function(req, res) {
    res.json({working: true});
  })

  .delete(function(req, res) {
    res.json({working: true});
  });

}
