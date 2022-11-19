//server.js
var express = require('express');
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use('/', express.static('dist/bca-choir-manager'));
var server = app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})

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



app.post('/account', (req, res) => {
  console.log("RECEIVED?");
  const accountInfo = req.body;

  database.add(accountInfo)
    .then(account => {
      res.status(201).json({ account })
    })
    .catch(err => {
      res.status(500).json({ err })
    });
    
});