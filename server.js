var express = require('express');
const app = express();

port = process.env.PORT || 3001;

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);
console.log("Server running on port " + port + "...");
