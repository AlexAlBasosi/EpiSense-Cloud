var mySQLConnection = require('../models/model');

mySQLConnection.connect(function(error){    
    if(!!error){
        console.log('Error making connection to database.')
        } else {
            console.log('Connection to database made.');
        }
});

exports.get_all_records = function(req, res){

    var result;

    console.log("Querying from the database...");
    mySQLConnection.query("SELECT * FROM records", function(error, rows, fields){
        if(!!error) {
            console.log("Query failed.");
        } else {
            console.log("Query successful.");

            console.log(rows);

            var recordJson = [rows.length];
            var json;

            for(var i = 0; i < rows.length; i++){
                recordJson[i] = {
                    "id": rows[i].ID,
                    "name": rows[i].Name
                }
            }
            
            res.json(recordJson);
        }
    });

};
