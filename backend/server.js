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
/*  "/api/status"
 *   GET: Get server status
 */

app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

app.get("/api/roster", function (req, res) {

  sql = `select account.first_name, account.last_name, account.pronouns, voicepart.name, student.choir_type, student.grad_year, student.email
  FROM account
  INNER JOIN student
  ON account.email = student.email
  INNER JOIN voicepart
  ON student.voicepart_ID = voicepart.voicepart_ID;`
  database.query(sql, function(err, rows, fields) 
  {
  if (err) throw err;

  var roster = [];
  for (let i = 0; i < rows.length; i++) {
  var person = [];
  person.push(rows[i].first_name);
  person.push(rows[i].last_name);
  person.push(rows[i].pronouns);
  person.push(rows[i].name);
  person.push(rows[i].choir_type);
  person.push(rows[i].grad_year);
  person.push(rows[i].email);
  roster.push(person);
  }

  res.send({roster: roster});
  });
});

app.get("/api/get-calendar-events/:starttime/:endtime", function(req, res){

  console.log(req.params.starttime);
  startTimeDate = new Date(Number(req.params.starttime));
  endTimeDate = new Date(Number(req.params.endtime));
  console.log(startTimeDate);
  let queryStartMonth = (startTimeDate.getMonth()+1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  let queryEndMonth = (endTimeDate.getMonth()+1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  let sql = 
  "select * from event where " +
  `event.start_time >= '${startTimeDate.getFullYear()}-${queryStartMonth}-01 00:00:00' ` +
  `and event.end_time <= '${endTimeDate.getFullYear()}-${queryEndMonth}-20 23:59:59'`;

  console.log(sql);
  database.query(sql, function(err, rows, fields){
    let events = [];

    for (let i = 0; i< rows.length; i++){
      let event = [];
      event.push(rows[i].event_name);
      event.push(rows[i].start_time);
      event.push(rows[i].end_time);
      event.push(rows[i].location);
      event.push(rows[i].address);
      events.push(event);
    }
    console.log(events);
    res.send({events:events});
  });

})

app.get("/api/email-recipients-input", function (req, res) {
  sql = `select account.first_name, account.last_name, account.email
  FROM account;`
  database.query(sql, function(err, rows, fields) 
  {
    console.log(rows);
    if (err) throw err;

    let emails = [];
    for (let i = 0; i < rows.length; i++) {
      let person = [];
      person.push(rows[i].first_name);
      person.push(rows[i].last_name);
      person.push(rows[i].email);
      emails.push(person);
    }
    res.send({emails: emails});
  });
});

app.post('/api/account', (req, res) => {
  const accountInfo = req.body; 
  sql = `INSERT INTO account (email, first_name, last_name, pronouns)
  VALUES (${database.escape(accountInfo[0])}, ${database.escape(accountInfo[1])}, ${database.escape(accountInfo[2])}, ${database.escape(accountInfo[3])})`;
  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;

    console.log(rows);
  });  
    console.log("ACCOUNT TABLE OF DATABASE");
    database.query('SELECT * FROM account', function(err, rows, fields) 
    {
      if (err) throw err;

      console.log(rows);
    });  
});

app.post('/api/roster', (req, res) => {
  const email = req.body;
  sql = `DELETE FROM student WHERE email = ${database.escape(email[0])};`;
  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;
  });  
});


/*  "/api/login"
 *   GET: Get server status
 */
app.get("/api/login", function (req, res) {
  res.status(200).json({ status: "UP" });
});
