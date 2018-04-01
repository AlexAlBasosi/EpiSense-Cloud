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