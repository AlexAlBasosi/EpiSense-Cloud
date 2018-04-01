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
                            "consultation_hours": rows[0].consultation_hours
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