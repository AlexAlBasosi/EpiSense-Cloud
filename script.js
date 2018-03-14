var express = require('express');
var mysql = require('mysql');
var app = express();
port = process.env.PORT || 3000;

var connectToDatabase = require('./api/models/model.js');
connectToDatabase();


/*app.get('/', function(req, res){
    //about mysql

    console.log("Querying from the database...");
    connection.query("SELECT * FROM mysampletable", function(error, rows, fields){
        console.log("here");
        if(!!error) {
            console.log("here1");
            console.log("Error in the query");
        } else {
            console.log("Query successful");
            console.log(rows);
        }
    })
})*/

app.listen(port);