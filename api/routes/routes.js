module.exports = function(app) {

    var controller = require('../controllers/controller');

    app.route('/records')
      .get(controller.get_all_records);

};