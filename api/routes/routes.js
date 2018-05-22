module.exports = function(app) {

  //patients
    var controller = require('../controllers/controller');

//     app.route('/patients')
//       .get(controller.patient_get_all_records)
//       .post(controller.patient_sign_up)

//     app.route('/patients/:patientID')
//       .get(controller.patient_get_specific_record)
//       .put(controller.update_profile)
//       .delete(controller.delete_specific_record)

//     app.route('/patients/:patientID/history')
//       .get(controller.get_seizure_history)
//       .post(controller.add_seizure)

//     app.route('/patients/:patientID/numberofseizures')
//       .get(controller.get_number_of_seizures_shaza)

//     app.route('/patients/:patientID/history/numberofseizuresbyday')
//       .get(controller.get_number_of_seizures_by_day)

//     app.route('/patients/:patientID/history/timestamps')
//       .get(controller.get_timestamps_array)

//     app.route('/patients/:patientID/history/timestamps/times')
//       .get(controller.get_timestamps_array_times)

//     app.route('/patients/:patientID/history/timestamps/numberofseizures')
//       .get(controller.get_number_of_seizures)

//     app.route('/patients/login')
//       .post(controller.patient_login)

//     app.route('/contacts')
//       .get(controller.get_emergency_contacts)
//       .post(controller.add_emergency_contact)
    
//     app.route('/contacts/:patientID')
//       .get(controller.get_specific_contact)
//       .delete(controller.delete_emergency_contact)

//     //temporary API, for testing
//     app.route('/logindetails')
//       .get(controller.get_login_details)

//     app.route('/adddates/:patientID')
//       .post(controller.add_dates)

    
//     //doctors

//     app.route('/doctors')
//       .get(controller.doctor_get_all_records)
//       .post(controller.doctor_sign_up)
    
//     app.route('/doctors/patients/:doctorID')
//       .get(controller.get_doctor_patients)

//     app.route('/doctors/:doctorID')
//       .get(controller.doctor_get_specific_record)

//     app.route('/doctors/login')
//       .post(controller.doctor_login)

//     app.route('/doctors/getID/:doctorEmail')
//       .get(controller.get_doctor_id)

    //serves the login page
    var express = require('express');
    app.use('/', express.static('public/login'))

    //serves the dashboard page
    app.use('/dashboard', express.static('public/dashboard'))

    //serves the patient charts page
    app.use('/charts', express.static('public/charts'))
};