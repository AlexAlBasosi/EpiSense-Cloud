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

    app.route('/contacts')
      .get(controller.get_emergency_contacts)
    
    app.route('/contacts/:patientID')
      .post(controller.add_emergency_contact)
      .delete(controller.delete_emergency_contact)

    //temporary API, for testing
    app.route('/logindetails')
      .get(controller.get_login_details)
};