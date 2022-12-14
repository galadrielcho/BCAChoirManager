//server.js
var express = require('express');

var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

app.use('/', express.static('dist/bca-choir-manager'));

app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = "'..\\frontend\\bca-choir-manager\\dist";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

var mysql      = require('mysql');
var database = mysql.createConnection({
  host     : 'soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com',
  user     : 'cho_vemuri',
  password : 'd8qbfhxnWeYB',
  database : 'bca_choir_manager'
});
database.connect();

/*
sql = `select account.first_name, account.last_name, account.pronouns, voicepart.name, student.choir_type, student.grad_year, student.email
FROM account
INNER JOIN student
ON account.email = student.email
INNER JOIN voicepart
ON student.voicepart_ID = voicepart.voicepart_ID;`
database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;

      console.log(rows);
    });  
*/


/*  "/api/status"
 *   GET: Get server status
 */

app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});


app.post('/api/account', (req, res) => {
  const accountInfo = req.body; 
  sql = `INSERT INTO account (email, first_name, last_name, pronouns)
  VALUES (${database.escape(accountInfo[0])}, ${database.escape(accountInfo[1])}, ${database.escape(accountInfo[2])}, ${database.escape(accountInfo[3])})`;

    console.log("ACCOUNT TABLE OF DATABASE");
    database.query('SELECT * FROM account', function(err, rows, fields) 
    {
      if (err) throw err;

      console.log(rows);
    });  
});


/*  "/api/login"
 *   GET: Get server status
 */
app.get("/api/login", function (req, res) {
  res.status(200).json({ status: "UP" });
});
