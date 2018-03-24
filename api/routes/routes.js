module.exports = function(app) {

    var controller = require('../controllers/controller');

    app.route('/patients')
      .get(controller.get_all_records)
      .post(controller.sign_up)
     // .delete(controller.delete_all_records)

    app.route('/patients/:patientID')
      .get(controller.get_specific_record)
      .put(controller.update_profile)
      .delete(controller.delete_specific_record)

    app.route('/patients/login')
      .post(controller.login)
};