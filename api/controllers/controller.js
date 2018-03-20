var mySQLConnection = require('../models/model');

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

exports.add_a_record = function(req, res){

    var id = req.query.ID;
    var name = req.query.Name;

    console.log("Adding to the database...");
    var sql = "INSERT INTO records (ID, Name) VALUES ('" + id + "', '" + name  + "')";
    console.log(sql);
    mySQLConnection.query(sql, function(error, rows, fields){
        if(error){
            console.log("Error posting to database.");
        } else {
            console.log("1 record inserted.");
            res.sendStatus(200);
        }
    });  
};
