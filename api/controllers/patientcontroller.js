var mySQLConnection = require('../models/model');
var hash = require('js-sha256');
var crypto = require('crypto');

mySQLConnection.connect(function(error){    
    if(error){
        console.log('Error making connection to database.');
    } else {
        console.log('Connection to database made.');
    }
});

//the following methods query the patientinfo table
exports.get_all_records = function(req, res){

    console.log("Querying from the database...");
    var sql = "SELECT * FROM patientinfo";
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            console.log(rows);

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "first_name": rows[i].first_name,
                    "last_name": rows[i].last_name,
                    "gender": rows[i].gender,
                    "age": rows[i].age,
                    "date_of_birth": rows[i].date_of_birth,
                    "contact_number": rows[i].contact_number,
                    "address": rows[i].address,
                    "emergency_contact_id": rows[i].emergency_contact_id,
                    "doctor_id": rows[i].doctor_id
                }
            }

            var jsonObj = {
                "Patients": recordJson
            }

            res.json(jsonObj);
        }
    });
};

exports.sign_up = function(req, res){

    var patientId = req.query.patient_id;
    var email = req.query.email;
    var firstName = req.query.first_name;
    var lastName = req.query.last_name;

    //hashes the password and stores it as a hash
    var sha256 = crypto.createHash("sha256");
    sha256.update(req.query.patient_password, "utf8");
    var password = sha256.digest("base64");


    console.log("Adding to the database...");
    var insertIntoPatientInfoTable = "INSERT INTO patientinfo (patient_id, first_name, last_name) VALUES ('\
    " + patientId + "', '" + firstName + "', '" + lastName + "')";

    var successFlag = false;

    mySQLConnection.query(insertIntoPatientInfoTable, function(error, rows, fields){
        if(error){
            console.log("Error posting to patientinfo table.");
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("1 record inserted into patientinfo table.");
            
            var insertIntoLoginDetailsTable = "INSERT INTO patient_logindetails (patient_id, email, patient_password) VALUES('\
            " + patientId + "', '" + email + "', '" + password + "')";

            mySQLConnection.query(insertIntoLoginDetailsTable, function(error, rows, fields){
                if(error){
                    console.log("Error posting to patient_logindetails table.");
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    console.log("1 record inserted into patient_logindetails table.");
                    res.sendStatus(200);
                }
            });
        }
    }); 
};


exports.get_specific_record = function(req, res){
    console.log("Querying from database...");
    var id = req.params.patientID;

    var sql = "SELECT * FROM patientinfo WHERE patientinfo.patient_id = " + id;
    mySQLConnection.query(sql, function(error, rows, fields){
        var loginsql = "SELECT email FROM patient_logindetails WHERE patient_logindetails.patient_id = " + id;

        if(error){
            console.log("Query failed.");
            console.log(error);
        } else {

            mySQLConnection.query(loginsql, function(innererror, innerrows, innerfields){

                var doctorsql = "SELECT first_name FROM doctorinfo WHERE doctor_id=" + rows[0].doctor_id;

                mySQLConnection.query(doctorsql, function(doctorerror, doctorrows, doctorfields){
                    if(doctorerror){
                        console.log("Query failed.");
                        console.log(doctorerror);
                    } else {

                        if(innererror){
                            console.log("Query failed.");
                            console.log(innererror);
                        } else {

                            console.log(innerrows);
                            var sql = "SELECT * FROM patientinfo";
        
                            console.log("Query successful.");
        
                            if(rows.length > 0){
        
                                var recordJson = [1];
        
                                recordJson[0] = {
                                    "patient_id": rows[0].patient_id,
                                    "first_name": rows[0].first_name,
                                    "last_name": rows[0].last_name,
                                    "gender": rows[0].gender,
                                    "age": rows[0].age,
                                    "date_of_birth": rows[0].date_of_birth,
                                    "contact_number": rows[0].contact_number,
                                    "address": rows[0].address,
                                    "email": innerrows[0].email,
                                    "emergency_contact_id": rows[0].emergency_contact_id,
                                    "doctor_id": rows[0].doctor_id,
                                    "doctor_name": doctorrows[0].first_name
                                }
        
                                var jsonObj = {
                                    "Patients": recordJson
                                }
        
                                res.json(jsonObj);
        
                            } else {
                                res.sendStatus(404);
                            }
                        }
                    }
                });
            });
        }
    });
};


exports.update_profile = function(req, res){
    console.log("Updating record...");
    var id = req.params.patientID;
    var firstName = req.query.first_name;
    var lastName = req.query.last_name;
    var gender = req.query.gender;
    var age = req.query.age;
    var date_of_birth = req.query.date_of_birth;
    var contact_number = req.query.contact_number;
    var address = req.query.address;
    var emergency_contact_id = req.query.emergency_contact_id;

    var sql = "UPDATE patientinfo SET \
         first_name = '" + firstName + "',\
         last_name = '" + lastName + "',\
         gender = '" + gender + "',\
         age = " + age + ",\
         date_of_birth = " + date_of_birth + ",\
         contact_number = '" + contact_number + "',\
         address = '" + address + "',\
         doctor_id = " + doctor_id + "\
     WHERE patient_id = " + id;

     mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Query failed.");
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("Profile updated.");
            res.sendStatus(200);
        }
    });
};

exports.login = function(req, res){

    var email = req.query.email;

    //hashes the password and stores it as a hash
    var sha256 = crypto.createHash("sha256");
    sha256.update(req.query.patient_password, "utf8");
    var password = sha256.digest("base64");

    var sql = "SELECT * FROM patient_logindetails";
    mySQLConnection.query(sql, function(error, rows, fields){

        var recordJson = [rows.length];

        for(var i = 0; i < rows.length; i++){
            recordJson[i] = {
                "patient_id": rows[i].patient_id,
                "email": rows[i].email,
                "patient_password": rows[i].patient_password   
            }
        }
    
        for(var i = 0; i < rows.length; i++){
            console.log("\n\nPatient ID: " + rows[i].patient_id);
            console.log("Email: " + rows[i].email);
            console.log("Patient Password: " + rows[i].patient_password);
        }

        var emailExists = false;
        var passwordMatch = false;

        var pid;

        for(var i = 0; i < rows.length; i++){
            if(recordJson[i].email == email){
                emailExists = true;

                if (recordJson[i].patient_password == password){
                    passwordMatch = true;
                    pid = recordJson[i].patient_id;
                }
            } 
        }

        pid = pid + "";

        if(emailExists && passwordMatch){
            res.send(pid); //user authenticated
        } else {
            res.sendStatus(403); //password incorrect
        } 

    });
};


exports.delete_specific_record = function(req, res){

    var patientID = req.params.patientID;

    var sql = "DELETE FROM patientinfo WHERE patient_id=" + patientID;
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Query failed.");
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("Patient record deleted.");
            res.sendStatus(200);
        }
    });
};


//the following methods query the patient_logindetails table
exports.get_login_details = function(req, res){

    console.log("Querying from the database...");
    var sql = "SELECT * FROM patient_logindetails";
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            console.log(rows);

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "email": rows[i].email,
                    "patient_password": rows[i].patient_password
                }
            }

            var jsonObj = {
                "Patients": recordJson
            }

            res.json(jsonObj);
        }
    });
};

//the following methods query the emergencycontacts table
exports.get_emergency_contacts = function(req, res){

    console.log("Querying from the database...");
    var sql = "SELECT * FROM emergencycontacts";
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            console.log(rows);

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "contact_number": rows[i].contact_number
                }
            }

            var jsonObj = {
                "Patients": recordJson
            }

            res.json(jsonObj);
        }
    });
};

exports.add_emergency_contact = function(req, res){
    console.log("Adding emergency contact.");
    var id = req.params.patientID;
    var contact_number = req.query.contact_number;

    var sql = "INSERT INTO emergencycontacts (patient_id, contact_number) VALUES('\
    " + id + "', '" + contact_number + "')";

    mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Query failed.");
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("Emergency contact added.");
            res.sendStatus(200);
        }
    });
};

exports.delete_emergency_contact = function(req, res){

    var id = req.params.patientID;

    console.log(id);

    var sql = "DELETE FROM emergencycontacts WHERE patient_id=" + id;
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Query failed.");
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("Emergency contact deleted.");
            res.sendStatus(200);
        }
    });
};

exports.get_seizure_history = function(req, res){

    var id = req.params.patientID;

    console.log("Querying from the database...");
    var sql = "SELECT * FROM seizure_history WHERE patient_id=" + id;
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            console.log(rows);

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "time": rows[i].time,
                    "date": rows[i].date,
                    "day": rows[i].day
                }
            }

            var jsonObj = {
                    "Seizures": recordJson
            }

            res.json(jsonObj);
        }
    });
};

exports.add_seizure = function(req, res){
    var id = req.params.patientID;
    var time = req.query.time;
    var date = req.query.date;
    var day = req.query.day;

    console.log("Adding to the database...");
    var insertIntoSeizureHistoryTable = "INSERT INTO seizure_history (patient_id, time, date, day) VALUES ('\
    " + id + "', '" + time + "', '" + date + "', '" + day +  "')";

    console.log(insertIntoSeizureHistoryTable);

    res.sendStatus(200);
};