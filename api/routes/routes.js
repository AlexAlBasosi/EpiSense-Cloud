module.exports = function(app) {

    var controller = require('../controllers/controller');

    app.route('/patients')
      .get(controller.get_all_records)
      .post(controller.sign_up)

    app.route('/patients/:patientID')
      .get(controller.get_specific_record)
      .put(controller.update_profile)

    app.route('/patients/login')
      .post(controller.login)
};