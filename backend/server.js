//server.js
var express = require('express');
var app = express();
app.use('/', express.static('dist/bca-choir-manager'));
var server = app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})