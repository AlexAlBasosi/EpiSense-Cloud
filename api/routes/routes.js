module.exports = function(app) {

    var controller = require('../controllers/controller');

    app.route('/patients')
      .get(controller.get_all_records)
      .post(controller.add_a_record)

   // app.route('/records')

};