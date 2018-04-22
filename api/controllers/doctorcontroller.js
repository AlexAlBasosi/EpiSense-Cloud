var mySQLConnection = require('../models/model');
var hash = require('js-sha256');
var crypto = require('crypto');

mySQLConnection.connect(function(error){    
    if(error){
        console.log('Error making connection to database.')
    } else {
        console.log('Connection to database made.');
    }
});

exports.get_all_records = function(req, res){
    
    console.log("Querying from the database...");
    var sql = "SELECT * FROM doctorinfo";
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            console.log(rows);

            var recordJson = [rows.length];

            console.log(recordJson);

             for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "doctor_id": rows[i].doctor_id,
                    "first_name": rows[i].first_name,
                    "last_name": rows[i].last_name,
                    "contact_number": rows[i].contact_number,
                    "address": rows[i].address,
                    "specialization": rows[i].specialization,
                    "consultation_hours": rows[i].consultation_hours
                }
            }

            var jsonObj = {
                "Doctors": recordJson
            }

            res.json(jsonObj); 
        }
    });

};

exports.get_specific_record = function(req, res){
    console.log("Querying from database...");
    var id = req.params.doctorID;

    var sql = "SELECT * FROM doctorinfo WHERE doctorinfo.doctor_id = " + id;

    mySQLConnection.query(sql, function(error, rows, fields){
        var loginsql = "SELECT email FROM doctor_logindetails WHERE doctor_logindetails.doctor_id = " + id;

       if(error){
            console.log("Query failed.");
            console.log(error);
        } else {
            mySQLConnection.query(loginsql, function(innererror, innerrows, innerfields){

                if(innererror){
                    console.log("Query failed.");
                    console.log(innererror);
                } else {

                    var sql = "SELECT * FROM doctorinfo";

                    console.log("Query successful.");

                    if(rows.length > 0){

                        var recordJson = [1];

                        recordJson[0] = {
                            "doctor_id": rows[0].doctor_id,
                            "first_name": rows[0].first_name,
                            "last_name": rows[0].last_name,
                            "contact_number": rows[0].contact_number,
                            "address": rows[0].address,
                            "specialization": rows[0].specialization,
                            "consultation_hours": rows[0].consultation_hours,
                            "email": innerrows[0].email
                        }

                        var jsonObj = {
                            "Doctors": recordJson
                        }

                        res.json(jsonObj);

                    } else {
                        res.sendStatus(404);
                    }
                }
            });
        }
    });
};

exports.sign_up = function(req, res){

    var doctorId = req.query.doctor_Id;
    var email = req.query.email;
    var firstName = req.query.first_name;
    var lastName = req.query.last_name;
    var speciality = req.query.specialization;

    //hashes the password and stores it as a hash
    var sha256 = crypto.createHash("sha256");
    sha256.update(req.query.doctor_password, "utf8");
    var password = sha256.digest("base64");


    console.log("Adding to the database...");
    var insertIntoDoctorInfoTable = "INSERT INTO doctorinfo (doctor_id, first_name, last_name, specialization) VALUES ('\
    " + doctorId + "', '" + firstName + "', '" + lastName + "', '" + speciality + "')";

    var successFlag = false;

    mySQLConnection.query(insertIntoDoctorInfoTable, function(error, rows, fields){
        if(error){
            console.log("Error posting to doctorinfo table.");
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("1 record inserted into doctorinfo table.");
            
            var insertIntoLoginDetailsTable = "INSERT INTO doctor_logindetails (doctor_id, email, doctor_password) VALUES('\
            " + doctorId + "', '" + email + "', '" + password + "')";

            mySQLConnection.query(insertIntoLoginDetailsTable, function(error, rows, fields){
                if(error){
                    console.log("Error posting to doctor_logindetails table.");
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    console.log("1 record inserted into doctor_logindetails table.");
                    res.sendStatus(200);
                }
            });
        }
    }); 
};

exports.login = function(req, res){

    var email = req.query.email;

    //hashes the password and stores it as a hash
    var sha256 = crypto.createHash("sha256");
    sha256.update(req.query.doctor_password, "utf8");
    var password = sha256.digest("base64");

    var sql = "SELECT * FROM doctor_logindetails";
    mySQLConnection.query(sql, function(error, rows, fields){

        var recordJson = [rows.length];

        for(var i = 0; i < rows.length; i++){
            recordJson[i] = {
                "doctor_id": rows[i].doctor_id,
                "email": rows[i].email,
                "doctor_password": rows[i].doctor_password   
            }
        }

        var emailExists = false;
        var passwordMatch = false;

        var pid;

        for(var i = 0; i < rows.length; i++){
            if(recordJson[i].email == email){
                emailExists = true;

                if (recordJson[i].doctor_password == password){
                    passwordMatch = true;
                    pid = recordJson[i].patient_id;
                }
            } 
        }

        pid = pid + "";

        if(emailExists && passwordMatch){
            res.sendStatus(200); //user authenticated
        } else {
            res.sendStatus(403); //password incorrect
        } 
    });
};

exports.get_doctor_patients = function(req, res){
    var doctorID = req.params.doctorID;
    var sql = "SELECT * patientinfo WHERE doctor_id = " + doctorID;
    console.log(sql);
}