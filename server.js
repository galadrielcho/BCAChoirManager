var express = require('express');
var auth = require('./auth');

var bodyParser = require("body-parser");
const path = require('path');
global.appRoot = path.resolve(__dirname);

var app = express();
app.use(auth.cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(global.appRoot + '/frontend/bca-choir-manager/dist/bca-choir-manager'));

const fs = require('fs');
const routes_directory = path.resolve(__dirname) + '//routes//'; 

fs.readdirSync(routes_directory).forEach(route_file => {
  try {
    app.use('/', require(routes_directory + route_file)());
  } catch (error) {
    console.log(`Encountered Error initializing routes from ${route_file}`);
    console.log(error);
  }
});

// Rewrites direct url routing
let folderDir = global.appRoot + '/frontend/bca-choir-manager/dist/bca-choir-manager';
app.use('*', function (req, res) {
  res.sendFile(path.join(folderDir, '/index.html'));
});


// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
// var distDir = "..\\frontend\\dist\\bca-choir-manager\\";
// app.use(express.static(distDir));

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});


