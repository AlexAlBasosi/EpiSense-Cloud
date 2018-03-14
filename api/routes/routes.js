module.exports = function(app) {

    var controller = require('../controllers/controller');

    app.route('/records')
      .get(controller.get_all_records)
      .post(controller.add_a_record)

};