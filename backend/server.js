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

  sql = `select account.first_name, account.last_name, account.pronouns, voicepart.name, voicepart.number, choirtype.choir_name, student.grad_year, student.email
  FROM account
  INNER JOIN student
  ON account.email = student.email
  INNER JOIN voicepart
  ON student.voicepart_ID = voicepart.voicepart_ID
  INNER JOIN choirtype
  ON student.choirtype_ID = choirtype.choirtype_ID`
  database.query(sql, function(err, rows, fields) 
  {
  if (err) throw err;

  var roster = [];
  for (let i = 0; i < rows.length; i++) {
  var person = [];
  person.push(rows[i].first_name);
  person.push(rows[i].last_name);
  person.push(rows[i].pronouns);
  person.push(rows[i].name); //voicepart
  person.push(rows[i].number); //voicepart number
  person.push(rows[i].choir_name);
  person.push(rows[i].grad_year);
  person.push(rows[i].email);
  roster.push(person);
  }

  res.send({roster: roster});
  });
});

app.get("/api/roster-update/:email", function (req, res) {
  sql = `select account.first_name, account.last_name, account.pronouns, voicepart.name, voicepart.number, choirtype.choir_name, student.grad_year, student.email
  FROM account
  INNER JOIN student
  ON account.email = student.email
  INNER JOIN voicepart
  ON student.voicepart_ID = voicepart.voicepart_ID
  INNER JOIN choirtype
  ON student.choirtype_ID = choirtype.choirtype_ID
  WHERE account.email = "${req.params.email}"`
  database.query(sql, function(err, rows, fields) 
  {
  if (err) throw err;

  
  var details = [];
  for (let i = 0; i < rows.length; i++) {
  var person = [];
  person.push(rows[i].first_name);
  person.push(rows[i].last_name);
  person.push(rows[i].pronouns);
  person.push(rows[i].name); //voicepart
  person.push(rows[i].number); //voicepart number
  person.push(rows[i].choir_name);
  person.push(rows[i].grad_year);
  details.push(person);
  }
  res.send({details: details});
  });
});

app.post("api/event/event-edit/", function(req, res) {
  const orig_event = req.body.orig_event;
  const new_event = req.body.new_event;
  sql = `UPDATE event 
        SET event_name=${new_event.event_name}, 
            start_time=${new_event.start_time},
            end_time=${new_event.end_time},
            location=${new_event.location},
            address=${new_event.address}
        WHERE 
            event_name=${orig_event.event_name} and
            start_time=${orig_event.start_time} and
            end_time=${orig_event.end_time} and
            location=${orig_event.location} and
            address=${orig_event.address}`;

  database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    }
  );  
                
}
);

app.post("/api/roster-update", function (req, res) {
  sql=`UPDATE account
  SET first_name = ${database.escape(req.body[1])}, last_name = ${database.escape(req.body[2])}, pronouns = ${database.escape(req.body[3])}
  WHERE email = ${database.escape(req.body[0])};`
  database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    });  
  
  sql=`UPDATE student
  SET grad_year = ${database.escape(req.body[7])}
  WHERE email = ${database.escape(req.body[0])};`
  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;
  });  

  sql=`SELECT voicepart_ID from voicepart 
  WHERE name = ${database.escape(req.body[4])} and number = ${database.escape(req.body[5])}`
  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;
    sql=`UPDATE student
    SET voicepart_ID = ${database.escape(rows[0].voicepart_ID)}
    WHERE email = ${database.escape(req.body[0])};`
    database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    });  
  }); 

  sql=`SELECT choirtype_ID from choirtype
  WHERE choir_name = ${database.escape(req.body[6])}`
  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;
    sql=`UPDATE student
    SET choirtype_ID = ${database.escape(rows[0].choirtype_ID)}
    WHERE email = ${database.escape(req.body[0])};`
    database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    });  
  }); 

});

app.get("/api/event/get-events-in-range/:starttime/:endtime/", function(req, res){
  startTimeDate = new Date(Number(req.params.starttime));
  endTimeDate = new Date(Number(req.params.endtime));

  let sql = 
  "select * from event where " +
  `event.start_time >= '${startTimeDate.toISOString()}' ` +
  `and event.end_time <= '${endTimeDate.toISOString()}'`;
  
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
    res.send({events:events});
  });

})

app.get("/api/email-recipients-input", function (req, res) {
  sql = `select account.first_name, account.last_name, account.email
  FROM account;`
  database.query(sql, function(err, rows, fields) 
  {
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
  VALUES (${database.escape(accountInfo[0])}, ${database.escape(accountInfo[1])}, 
    ${database.escape(accountInfo[2])}, ${database.escape(accountInfo[3])})`;
  database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    });  

  database.query('SELECT * FROM account', function(err, rows, fields) 
    {
      if (err) throw err;
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

app.delete('/api/event/:name/:starttime/:endtime/', (req, res) => {
  const startTimeDate = new Date(Number(req.params.starttime))
    .toLocaleString('sv').replace(' ', 'T'); // format into ISO but local time
  const endTimeDate = new Date(Number(req.params.endtime))
    .toLocaleString('sv').replace(' ', 'T');
    
  let sql = `DELETE FROM event 
      WHERE event.event_name = '${req.params.name}' and ` +
      `event.start_time = '${startTimeDate}'` +
      `and event.end_time = '${endTimeDate}'`;
      
  console.log(sql);
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

/*  "/api/get-all-events"
 *   GET: Retrieves all events
 */
app.get("/api/event/get-all-events", function (req, res) {
  sql = `SELECT * FROM event`
  database.query(sql, function(err, events, fields) 
  {
  if (err) throw err;

  res.send({events : events});
  });});
