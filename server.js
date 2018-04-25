var express = require('express');
var mysql = require('mysql');


var app = express();
port = process.env.PORT || 3001;

var mySQLConnection = require('./api/models/model');

var routes = require('./api/routes/routes');
routes(app);
app.listen(port);
console.log("Server running on port " + port + "...");
