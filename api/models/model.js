
var mysql = require('mysql');

var mySQLConnection = function(){
    var connection = mysql.createConnection({
        //properties
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'EpiSense'
        });
    
    connection.connect(function(error){
    if(!!error){
        console.log('Error making connection to database.')
        } else {
            console.log('Connection to database made.');
        }
    });
}

module.exports = mySQLConnection;