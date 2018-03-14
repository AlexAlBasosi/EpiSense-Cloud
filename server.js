var express = require('express');
var mysql = require('mysql');
var app = express();
port = process.env.PORT || 3000;

var mySQLConnection = require('./api/models/model');

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);