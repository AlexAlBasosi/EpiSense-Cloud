var mysql = require('mysql');
var url = require('url');
let cfenv = require('cfenv');
const assert = require('assert');
const util = require('util')


// load local VCAP configuration  and service credentials
let vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP");
} catch (e) { 
    // console.log(e)
}

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}
const appEnv = cfenv.getAppEnv(appEnvOpts);

// Within the application environment (appenv) there's a services object
let services = appEnv.services;

// The services object is a map named by service so we extract the one for PostgreSQL
let mysql_services = services["compose-for-mysql"];

// This check ensures there is a services for MySQL databases
assert(!util.isUndefined(mysql_services), "Must be bound to compose-for-mysql services");

// We now take the first bound MongoDB service and extract it's credentials object
let credentials = mysql_services[0].credentials;

let connectionString = credentials.uri;

// First we need to parse the connection string. Although we could pass
// the URL directly, that doesn't allow us to set an SSL certificate.

let mysqlurl = new url.URL(connectionString);
let options = {
    host: mysqlurl.hostname,
    port: mysqlurl.port,
    user: mysqlurl.username,
    password: mysqlurl.password,
    database: mysqlurl.pathname.split("/")[1]
};

// If the path to the certificate is set, we assume SSL.
// Therefore we read the cert and set the options for a validated SSL connection
if (credentials.ca_certificate_base64) {
    var ca = new Buffer(credentials.ca_certificate_base64, 'base64');
    options.ssl = { ca: ca };
    options.flags = "--ssl-mode=REQUIRED";
}

// set up a new connection using our config details
var connect = module.exports = mysql.createConnection(options);