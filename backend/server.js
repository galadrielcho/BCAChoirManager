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

/*  "/api/roster"
 *   GET: Gets roster of all registered students.
 *   Retrieves the following infromation:
 *      first name, last name, pronouns, voice part name, 
 *      voice part number, choir type, grad_year, email
 */

app.get("/api/roster", function (req, res) {
  sql = `CALL getStudentRoster();`
  database.query(sql, function(err, roster, fields) 
  {
  if (err) throw err;


  let result = Object.values(JSON.parse(JSON.stringify(roster[0])));
 
  res.send({roster: result});
  });


});

/*  "/api/get-student/:email"
 *   GET: Gets the data of a student.
 *   Retrieves the following infromation:
 *      first name, last name, pronouns, voice part name, 
 *      voice part number, choir type, grad_year
 */

app.get("/api/get-student/:email", function (req, res) {
  sql = `CALL getStudent("${req.params.email}");`

  database.query(sql, function(err, student, fields) 
  
  {
  let result = Object.values(JSON.parse(JSON.stringify(student[0])))[0];
  if (err) throw err;
  res.send({details: result});
  });
});

app.get("/api/get-account/:email", function (req, res) {
  sql = `CALL getAccount("${req.params.email}");`

  database.query(sql, function(err, account, fields) 
  
  {
  let result = Object.values(JSON.parse(JSON.stringify(account[0])))[0];
  if (err) throw err;
  res.send({details: result});
  });
});

app.post("/api/event/event-create/", function(req, res){
  const event = req.body;
  const startTimeDate = new Date(event.start_time)
  .toLocaleString('sv').replace(' ', 'T'); 
  const endTimeDate = new Date(event.end_time)
  .toLocaleString('sv').replace(' ', 'T'); 


  sql = `
    INSERT INTO event(event_name, start_time, end_time, location, address)
    VALUES ("${event.event_name}", '${startTimeDate}', '${endTimeDate}', "${event.location}", "${event.address}")`;

  console.log(sql);
  database.query(sql, function(err, rows, fields) 
      {
        if (err) throw err;
      }
    );  
            

})
app.post("/api/event/event-edit/", function(req, res) {
  const orig_event = req.body.orig_event;
  const new_event = req.body.new_event;

  const orig_startTimeDate = new Date(orig_event.start_time)
  .toLocaleString('sv').replace(' ', 'T'); 
  const orig_endTimeDate = new Date(orig_event.end_time)
  .toLocaleString('sv').replace(' ', 'T');
  const new_startTimeDate = new Date(new_event.start_time)
  .toLocaleString('sv').replace(' ', 'T'); // format into ISO but local time
  const new_endTimeDate = new Date(new_event.end_time)
  .toLocaleString('sv').replace(' ', 'T');


  sql = `UPDATE event 
        SET event_name="${new_event.event_name}", 
            start_time='${new_startTimeDate}',
            end_time='${new_endTimeDate}',
            location="${new_event.location}",
            address="${new_event.address}",
            choir_type_id=${new_event.choir_type == "Concert"? 1: 2 }
        WHERE 
            event_name="${orig_event.event_name}" and
            start_time='${orig_startTimeDate}' and
            end_time='${orig_endTimeDate}' and
            location="${orig_event.location}" and
            address="${orig_event.address}" and
            choir_type_id=${orig_event.choir_type == "Concert" ? 1: 2}
            `;

  console.log(sql);
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

  sql=`SELECT voicepart_id from voicepart 
  WHERE voicepart_name = ${database.escape(req.body[4])} and number = ${database.escape(req.body[5])}`
  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;
    sql=`UPDATE student
    SET voicepart_id = ${database.escape(rows[0].voicepart_id)}
    WHERE email = ${database.escape(req.body[0])};`
    database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    });  
  }); 

  sql=`SELECT choir_type_id from choir_type
  WHERE choir_name = ${database.escape(req.body[6])}`
  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;
    sql=`UPDATE student
    SET choir_type_id = ${database.escape(rows[0].choir_type_id)}
    WHERE email = ${database.escape(req.body[0])};`
    database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    });  
  }); 

});

app.post("/api/sign-up", function (req, res) {
  
  // insert into account
  sql = `INSERT INTO account (email, first_name, last_name, pronouns) VALUES (${database.escape(req.body[0])},${database.escape(req.body[1])}, ${database.escape(req.body[2])}, ${database.escape(req.body[3])});`
  database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    }); 
  

  // figure out voicepart_id
  sql=`SELECT voicepart_id from voicepart 
  WHERE voicepart_name = ${database.escape(req.body[4])} and number = ${database.escape(req.body[5])}`
  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;
    let voicepart_id = rows[0].voicepart_id;
    // THEN figure out choirtype_id
    sql=`SELECT choir_type_id from choir_type
    WHERE choir_name = ${database.escape(req.body[6])}`
    database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
      choir_type_id = rows[0].choir_type_id;
      // THEN insert into student
      sql = `INSERT INTO student (email, voicepart_id, grad_year, choir_type_id) VALUES (${database.escape(req.body[0])}, ${database.escape(voicepart_id)}, ${database.escape(req.body[7])}, ${database.escape(choir_type_id)});`
      database.query(sql, function(err, rows, fields) 
        {
          if (err) throw err;
        });  
      
    }); 
    
  }); 
  
  
  

});

app.get("/api/event/get-events-in-range/:starttime/:endtime/", function(req, res){
  startTimeDate = new Date(Number(req.params.starttime));
  endTimeDate = new Date(Number(req.params.endtime));

  let sql = 
    `SELECT event_name, start_time, end_time, location, address,
    choir_type.choir_name FROM event 
    INNER JOIN choir_type
    ON event.choir_type_id = choir_type.choir_type_id
    WHERE 
    event.start_time >= '${startTimeDate.toISOString()}'
    AND event.end_time <= '${endTimeDate.toISOString()}'`;


  database.query(sql, function(err, rows, fields){
    let events = [];

    for (let i = 0; i< rows.length; i++){
      let event = [];
      event.push(rows[i].event_name);
      event.push(rows[i].start_time);
      event.push(rows[i].end_time);
      event.push(rows[i].location);
      event.push(rows[i].address);
      event.push(rows[i].choir_name);

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
  sql = `DELETE FROM account WHERE email = ${database.escape(email[0])};`;
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
  sql = `	SELECT event_name, start_time, end_time, location, address, choir_type.choir_name as choir_type
	FROM event
	INNER JOIN choir_type
	ON event.choir_type_id = choir_type.choir_type_id`
  database.query(sql, function(err, events, fields) 
  {
  if (err) throw err;
  res.send({events : events});
  });});


  /*  "/api/get-student/:email"
 *   GET: Gets the data of a student.
 *   Retrieves the following infromation:
 *      first name, last name, pronouns, voice part name, 
 *      voice part number, choir type, grad_year
 */


  app.post("/api/event/add-student-to-event/", function(req, res){

    const startTimeDate = new Date(req.body.event.start_time)
                                  .toLocaleString('sv').replace(' ', 'T'); 

    sql = `CALL addStudentToEvent('${req.body.event.event_name}', '${startTimeDate}', 
                                  '${req.body.student_email}', '${req.body.voicepart_name}',
                                  ${req.body.voicepart_number})`;                                  
    database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
    });  
  
    console.log(sql);

  });

  app.post("/api/event/delete-student-from-event", function(req, res){
    const startTimeDate = new Date(req.body.event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 

    sql = `CALL deleteStudentFromEvent('${req.body.event.event_name}', '${startTimeDate}', 
                                  '${req.body.student_email}')`;   

  database.query(sql, function(err, rows, fields) 
  {
    if (err) throw err;
  });  

  });

app.get("/api/get-event-registrees/:eventname/:starttime", function (req, res) {
  sql = `CALL getEventRegistrees("${req.params.eventname}", "2023-02-02 00:00:00");`

  console.log(sql);
  database.query(sql, function(err, registrees, fields) 
  
  {
  let result = Object.values(JSON.parse(JSON.stringify(registrees[0])));

  console.log("Test!")
  console.log(registrees)

  console.log(result);
  if (err) throw err;
  res.send({registrees: result});
  });
});
