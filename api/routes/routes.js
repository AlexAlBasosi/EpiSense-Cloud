module.exports = function(app) {

    var controller = require('../controllers/controller');

    app.route('/patients')
      .get(controller.get_all_records)
      .post(controller.sign_up)

    app.route('/patients/:patientID')
      .get(controller.get_specific_record)
      .put(controller.update_profile)
      .delete(controller.delete_specific_record)

    app.route('/patients/login')
      .post(controller.login)

    //temporary API, for testing
    app.route('/logindetails')
      .get(controller.get_login_details)
};