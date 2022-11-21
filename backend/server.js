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

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});


var mysql      = require('mysql');
var database = mysql.createConnection({
  host     : 'soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com',
  user     : 'cho_vemuri',
  password : 'd8qbfhxnWeYB',
  database : 'bca_choir_manager'
});
database.connect();


const accountInfo = {
  email: "abc@bergen.org",
  first_name: "timothy",
  last_name: "bezos",
  prounouns: "he/him"
};

const email = 'Tommy';
const first_name = 'Tommy';
const last_name = 'Bezos';
const pronouns = 'he/him';
//sql = `UPDATE users SET name =${db.escape(name)} WHERE id = ${db.escape(id)}`
sql = `INSERT INTO account (email, first_name, last_name, pronouns)
VALUES (${database.escape(email)}, ${database.escape(first_name)}, ${database.escape(last_name)}, ${database.escape(pronouns)})`;

database.query(sql, function(err, rows, fields) 
{
  if (err) throw err;

  console.log(rows[0]);
});

database.query('SELECT * FROM account', function(err, rows, fields) 
{
  if (err) throw err;

  //console.log(rows[0]);
  console.log(rows);
});

app.post('/api/account', (req, res) => {
  console.log("RECEIVED?");   
});