
var mysql = require('mysql');

    var connect = module.exports = mysql.createConnection({
    //properties
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'EpiSense',
        port: '3307'
    });


