module.exports = function(app) {

  //patients
    var patientcontroller = require('../controllers/patientcontroller');

    app.route('/patients')
      .get(patientcontroller.get_all_records)
      .post(patientcontroller.sign_up)

    app.route('/patients/:patientID')
      .get(patientcontroller.get_specific_record)
      .put(patientcontroller.update_profile)
      .delete(patientcontroller.delete_specific_record)

    app.route('/patients/:patientID/history')
      .get(patientcontroller.get_seizure_history)
      .post(patientcontroller.add_seizure)

    app.route('/patients/login')
      .post(patientcontroller.login)

    app.route('/contacts')
      .get(patientcontroller.get_emergency_contacts)
    
    app.route('/contacts/:patientID')
      .post(patientcontroller.add_emergency_contact)
      .delete(patientcontroller.delete_emergency_contact)

    //temporary API, for testing
    app.route('/logindetails')
      .get(patientcontroller.get_login_details)

    
    //doctors
    var doctorcontroller = require('../controllers/doctorcontroller');

    app.route('/doctors')
      .get(doctorcontroller.get_all_records)

    app.route('/doctors/:doctorID')
      .get(doctorcontroller.get_specific_record)

};