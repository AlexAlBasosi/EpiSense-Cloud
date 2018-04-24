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
                    "doctor_id": rows[i].doctor_id,
                    "sign_up_timestamp": rows[i].sign_up_timestamp
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
    var doctorEmail = req.query.doctor_email;

    //hashes the password and stores it as a hash
    var sha256 = crypto.createHash("sha256");
    sha256.update(req.query.patient_password, "utf8");
    var password = sha256.digest("base64");

    var doctorLoginSQL = "SELECT * FROM doctor_logindetails";

    var successFlag = false;
    var doctorID;

    mySQLConnection.query(doctorLoginSQL, function(error, rows, fields){
        for(var i = 0; i < rows.length; i++){
            if(rows[i].email == doctorEmail){
                successFlag = true;
                doctorID = rows[i].doctor_id;
            } 
        }

        if(successFlag == true){
            var timestamp = new Date();
            console.log(timestamp);
            var date = timestamp.toDateString();

            console.log("Adding to the database...");
            var insertIntoPatientInfoTable = "INSERT INTO patientinfo (patient_id, first_name, last_name, doctor_id, sign_up_timestamp) VALUES ('\
            " + patientId + "', '" + firstName + "', '" + lastName + "', '" + doctorID + "', '" + timestamp + "')";

            successFlag = true;

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
        } else {
            res.sendStatus(403);
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
                                    "doctor_id": rows[0].doctor_id,
                                    "doctor_name": doctorrows[0].first_name,
                                    "sign_up_timestamp": rows[0].sign_up_timestamp
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
    // var gender = req.query.gender;
    // var age = req.query.age;
    var date_of_birth = req.query.date_of_birth;
    var contact_number = req.query.contact_number;
    var address = req.query.address;

    var sql = "UPDATE patientinfo SET date_of_birth = '" + date_of_birth + "', contact_number ='" + contact_number + "',  address= '" + address + "' WHERE patient_id= " + id;

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
                    "contact_number": rows[i].contact_number,
                    "first_name": rows[i].first_name,
                    "last_name": rows[i].last_name
                }
            }

            var jsonObj = {
                "Contacts": recordJson
            }

            res.json(jsonObj);
        }
    });
};

exports.get_specific_contact = function(req, res){
    var id = req.params.patientID;

    console.log("Querying from the database...");

    var sql = "SELECT * FROM emergencycontacts WHERE patient_id=" + id;
    console.log(sql);

    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "contact_number": rows[i].contact_number,
                    "first_name": rows[i].first_name,
                    "last_name": rows[i].last_name
                }
            }

            var jsonObj = {
                "Contacts": recordJson
            }

            res.json(jsonObj);
        }
    });
};

exports.add_emergency_contact = function(req, res){
    console.log("Adding emergency contact.");
    var id = req.query.patient_id;
    var contact_number = req.query.contact_number;
    var first_name = req.query.first_name;
    var last_name = req.query.last_name;

    var sql = "INSERT INTO emergencycontacts (patient_id, contact_number, first_name, last_name) VALUES('" + id + "', '" + contact_number + "', '" + first_name + "', '" + last_name + "')";

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
    var number = req.query.contact_number;

    var sql = "DELETE FROM emergencycontacts WHERE patient_id=" + id + " AND contact_number='" + number + "'";

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

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "timestamp": rows[i].timestamp.toDateString(),
                    "isSeizure": rows[i].isSeizure
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
    var timestamp = req.query.timestamp;
    var date = new Date(timestamp).toDateString();
    var isSeizure = req.query.isSeizure;

    console.log("Adding to the database...");
    var insertIntoSeizureHistoryTable = "INSERT INTO seizure_history (patient_id, timestamp, date, isSeizure) VALUES ('\
    " + id + "', '" + timestamp + "', '" + date + "', '" + isSeizure +  "')";

    mySQLConnection.query(insertIntoSeizureHistoryTable, function(error, rows, fields){
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

exports.get_timestamps_array = function(req, res){
    var patientID = req.params.patientID;

    console.log("Querying from the database...");

    var sql = "SELECT timestamp FROM seizure_history WHERE patient_id=" + patientID;

    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "day": i+1,
                    "date": new Date(rows[i].timestamp)
                }
            }

            recordJson.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
            });

            var countedJSON = [];
            var lengthIndex = recordJson.length;
            var arr = [];

            for(var i = 0; i < recordJson.length; i++){
                if(recordJson[0] !== 0){
                    arr[i] = recordJson[i].date.toDateString();
                }
            }

            uniqueArray = arr.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })

            res.send(uniqueArray);
        }
    });
};

exports.get_timestamps_array_times = function(req, res){
    var patientID = req.params.patientID;

    var seizuresArray = [];

    var sql = "SELECT timestamp FROM seizure_history WHERE patient_id=" + patientID;

    mySQLConnection.query(sql, function(error, rows, fields){
        for(var i = 0; i < rows.length; i++){
            seizuresArray.push(rows[i].timestamp);
        }

        var timestamp = new Date();
        console.log(timestamp.getHours());

        var morningCount = 0; //6-11
        var afternoonCount = 0; //12-16
        var eveningCount = 0; //17-19
        var nightCount = 0; //20-23, 0-5

        for(var i = 0; i < seizuresArray.length; i++){
            if((seizuresArray[i].getHours() >= 0 && seizuresArray[i].getHours() <= 5) || (seizuresArray[i].getHours() >= 20 && seizuresArray[i].getHours() <= 23)){
                nightCount++;
            } else if(seizuresArray[i].getHours() >= 6 && seizuresArray[i].getHours() <= 11){
                morningCount++;
            } else if(seizuresArray[i].getHours() >= 12 && seizuresArray[i].getHours() <= 16){
                afternoonCount++;
            } else if(seizuresArray[i].getHours() >= 17 && seizuresArray[i].getHours() <= 19){
                eveningCount++;
            }
        }

        var timeOfDay = {
            "morning": morningCount,
            "afternoon": afternoonCount,
            "evening": eveningCount,
            "night": nightCount
        }

        
        res.send(timeOfDay);
    })
};

exports.get_number_of_seizures = function(req, res){
    var patientID = req.params.patientID;
    var timestamp = new Date(req.query.timestamp);
    var timestampdate = timestamp.toDateString();


    var sql = "SELECT * FROM seizure_history WHERE patient_id=" + patientID + " AND timestamp='" + timestamp + "' AND isSeizure=1";

    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "timestamp": rows[i].timestamp,
                    "isSeizure": rows[i].isSeizure
                }
            }

            if(recordJson[0] == 0){
                res.send("0");
            } else {
                res.send(recordJson);
            }
        }
    });
};

exports.get_number_of_seizures_by_day = function(req, res){
    var patientID = req.params.patientID;
    var date = req.query.date;

    console.log("Patient ID: " + patientID);
    console.log("Date: " + date);

    var sql = "SELECT * FROM seizure_history WHERE patient_id=" + patientID + " AND date='" + date + "' AND isSeizure=1";

    console.log(sql);
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
            console.log(error);
        } else {
            console.log("Query successful.");

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "timestamp": rows[i].timestamp.toDateString(),
                    "isSeizure": rows[i].isSeizure
                }
            }

            if(recordJson[0] == 0){
                res.send("0");
            } else {
                res.send(recordJson.length.toString());
            }
        }
    });
}

exports.get_number_of_seizures_shaza = function(req, res){
    var id = req.params.patientID;

    console.log("Querying from the database...");
    var sql = "SELECT * FROM seizure_history WHERE patient_id=" + id + " AND isSeizure=1";
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            var recordJson = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "timestamp": rows[i].timestamp.toDateString(),
                    "isSeizure": rows[i].isSeizure
                }
            }

            if(recordJson[0] == 0){
                var numberOfSeizuresArray = [];

                numberOfSeizuresArray[0] = {
                    "numberOfSeizures": 0
                }

                var seizureJSON = {
                    "Seizures": numberOfSeizuresArray
                }

                res.send(seizureJSON);
            } else {
                var numberOfSeizuresArray = [];

                numberOfSeizuresArray[0] = {
                    "numberOfSeizures": recordJson.length
                }

                var seizureJSON = {
                    "Seizures": numberOfSeizuresArray
                }

                res.send(seizureJSON);
            }
        }
    });
};

//development API
exports.add_dates = function(req, res){
    var id = req.params.patientID;

    var sql = "SELECT * FROM seizure_history";


    mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            var recordJson = [rows.length];
            var datestamps = [rows.length];

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "patient_id": rows[i].patient_id,
                    "timestamp": rows[i].timestamp,
                    "date": rows[i].date,
                    "isSeizure": rows[i].isSeizure
                }
            }

            for(var i = 0; i < recordJson.length; i++){
                var time = new Date(recordJson[i].timestamp);
                datestamps[i] = time.toDateString();
            }

             

            for(var i = 0; i < datestamps.length; i++){
                var sql = "UPDATE seizure_history SET date='" + datestamps[i] + "' WHERE patient_id=" + id;
                mySQLConnection.query(sql, function(error, rows, fields){
                    if(error){
                        console.log("Query failed.");
                        console.log(error);
                    } else {
                        console.log("Query successful.");
                    }
                });
            }
        }

        res.send(recordJson);

    });
};