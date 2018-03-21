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
                    "patient_password": rows[i].patient_password,
                    "first_name": rows[i].first_name,
                    "last_name": rows[i].last_name,
                    "email": rows[i].email,
                    "gender": rows[i].gender,
                    "age": rows[i].age,
                    "date_of_birth": rows[i].date_of_birth,
                    "contact_number": rows[i].contact_number,
                    "address": rows[i].address,
                    "emergency_contact_id": rows[i].emergency_contact_id
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

    var sha256 = crypto.createHash("sha256");
    sha256.update(req.query.patient_password, "utf8");
    var password = sha256.digest("base64");
    console.log("Hashed password is " + password);

    console.log("Adding to the database...");
    var sql = "INSERT INTO patientinfo (patient_id, patient_password) VALUES ('" + patientId + "', '" + password + "')";

    console.log(sql);
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Error posting to database.");
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("1 record inserted.");
            res.sendStatus(200);
        }
    });  
};

exports.get_specific_record = function(req, res){
    console.log("Querying from database...");
    var id = req.params.patientID;

    var sql = "SELECT * FROM patientinfo WHERE patientinfo.patient_id = " + id;
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Query failed.");
            console.log(error);
        } else {

            var sql = "SELECT * FROM patientinfo";

                console.log("Query successful.");

                if(rows.length > 0){

                    var recordJson = {
                        "patient_id": rows[0].patient_id,
                        "patient_password": rows[0].patient_password,
                        "first_name": rows[0].first_name,
                        "last_name": rows[0].last_name,
                        "email": rows[0].email,
                        "gender": rows[0].gender,
                        "age": rows[0].age,
                        "date_of_birth": rows[0].date_of_birth,
                        "contact_number": rows[0].contact_number,
                        "address": rows[0].address,
                        "emergency_contact_id": rows[0].emergency_contact_id
                    }

                    var jsonObj = {
                        "Patients": recordJson
                    }

                    res.json(jsonObj);

                } else {
                    res.sendStatus(404);
                }
        }
    });
};

exports.update_profile = function(req, res){
    console.log("Updating record...");
    var id = req.params.patientID;
    var firstName = req.query.first_name;
    var lastName = req.query.last_name;
    var email = req.query.email;
    var gender = req.query.gender;
    var age = req.query.age;
    var date_of_birth = req.query.date_of_birth;
    var contact_number = req.query.contact_number;
    var address = req.query.address;
    var emergency_contact_id = req.query.emergency_contact_id;

    console.log(id);


    var sql = "UPDATE patientinfo SET \
         first_name = '" + firstName + "',\
         last_name = '" + lastName + "',\
         email = '" + email + "',\
         gender = '" + gender + "',\
         age = " + age + ",\
         date_of_birth = " + date_of_birth + ",\
         contact_number = '" + contact_number + "',\
         address = '" + address + "',\
         emergency_contact_id = " + emergency_contact_id + "\
     WHERE patient_id = " + id;

     console.log("Your SQL:" + sql);

     mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Query failed.");
            console.log(error);
        } else {
            console.log("Profile updated.");
            res.sendStatus(200);
        }
    });


};
