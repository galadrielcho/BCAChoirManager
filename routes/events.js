var database = require('../db');
var auth = require('../auth');

const router = require('express').Router();

module.exports = function () {

/*  "/api/event/event-create/"
 *   POST: Creates an event
 *   Takes the following parameters within an event object:
 *      name, start time, end time, location, address
*/

  router.post("/api/event/event-create/", auth.checkJwt, function(req, res){
    const event = req.body;
    const startTimeDate = new Date(event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 
    const endTimeDate = new Date(event.end_time)
    .toLocaleString('sv').replace(' ', 'T'); 
    
    database.execute(
      'CALL createEvent(?, ?, ?, ?, ?, ?, ?)',
      [event.event_name, startTimeDate, endTimeDate, event.location, event.address,
        event.choir_type, event.registration_status],
      function (err, results, fields) {
        if (err) throw err;
      });
  });

  
/*  "/api/event/event-edit/"
 *   POST: Edits an event
 *   Takes the following parameters:
 *      orig_event (Event object), new_event (Event object)
*/

  router.post("/api/event/event-edit/", auth.checkJwt, function(req, res) {
    const orig_event = req.body.orig_event;
    const new_event = req.body.new_event;
    
    const orig_startTimeDate = new Date(orig_event.start_time).toLocaleString('sv').replace(' ', 'T'); 
    const new_startTimeDate = new Date(new_event.start_time).toLocaleString('sv').replace(' ', 'T'); // format into ISO but local time
    const new_endTimeDate = new Date(new_event.end_time).toLocaleString('sv').replace(' ', 'T');

    database.execute(
      'CALL updateEvent(?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [orig_event.event_name, orig_startTimeDate, new_event.event_name, new_startTimeDate, 
        new_endTimeDate, new_event.location, new_event.address, new_event.choir_type, new_event.registration_status],
      function (err, results, fields) {
        if (err) throw err;
      });               
  });


/*  "/api/event/:name/:starttime/"
 *   GET: Gets one specific event
 *   Takes the following parameters:
 *      name, start time
*/

router.get('/api/event/:name/:starttime/', function(req, res){
  startTimeDate = new Date(Number(req.params.starttime)).toISOString();
  database.execute(
    'CALL getEvent(?, ?)',
    [req.params.name, endTimeDate],
    function (err, results, fields) {
      if (err) throw err;
      res.send(results[0]);
  });      
});
      
/*  "/api/event/get-events-in-range/:starttime/:endtime/"
 *   GET: Gets all events within a specific time range
 *   Takes the following parameters:
 *      start time, end time
*/

  router.get("/api/event/get-events-in-range/:starttime/:endtime/", function(req, res){
    startTimeDate = new Date(Number(req.params.starttime)).toISOString();
      endTimeDate = new Date(Number(req.params.endtime)).toISOString();

      database.execute(
        'CALL getEventsInRange(?, ?)',
        [startTimeDate, endTimeDate],
        function (err, results, fields) {
          if (err) throw err;
          res.send(results[0]);
        });      
  });
    

/*  "/api/event/:name/:starttime/
 *   DELETE: Delete an event
 *   Takes the following parameters:
 *      name, start time
*/

  router.delete('/api/event/:name/:starttime/', auth.checkJwt, (req, res) => {
    const startTimeDate = new Date(Number(req.params.starttime))
      .toLocaleString('sv').replace(' ', 'T'); // format into ISO but local time

    database.execute(
      'CALL deleteEvent(?, ?)',
      [req.params.name, startTimeDate],
      function (err, results, fields) {
        if (err) throw err;
      });      
    });

 /*  "/api/get-all-events"
 *   GET: Gets all events
 *   Retrieves the following infromation:
 *      event name, start time, end time, location,
 *      address, and choir type
 */

  router.get("/api/event/get-all-events", function (req, res) {
    database.execute(
      'CALL getAllEvents()',
      [],
      function (err, results, fields) {
        if (err) throw err;
        res.send(results[0]);
      }
    );      
  });
  

/*  "/api/event/add-student-to-event/"
 *   POST: Adds student to event
 *   Takes the following parameters:
 *      event name, event start time
 *      student email, voice part, voice part number
 */

  router.post("/api/event/add-student-to-event/", auth.checkJwt, function(req, res){
    console.log("student data: " + req.body.event.event_name + " " + req.body.student_email + " " + 
    req.body.voicepart_name + " " + req.body.voicepart_number);
    const startTimeDate = new Date(req.body.event.start_time)
                                  .toLocaleString('sv').replace(' ', 'T');                 
    database.execute(
      'CALL addStudentToEvent(?, ?, ?, ?, ?)',
      [req.body.event.event_name, startTimeDate, req.body.student_email,
        req.body.voicepart_name, req.body.voicepart_number],
      function (err, results, fields) {
        if (err) throw err;
      }
    );       

  });

/*  "/api/event/check-student-in-event/"
 *   POST: Checks if student is in event already
 *   Takes the following parameters:
 *      event name, event start time
 *      student email
 */

  router.post("/api/event/check-student-in-event/", auth.checkJwt, function(req, res){
    const startTimeDate = new Date(req.body.event.start_time)
                                  .toLocaleString('sv').replace(' ', 'T');    
    database.execute(
      'CALL countStudentInEvent(?, ?, ?)',
      [req.body.event.event_name, startTimeDate, req.body.student_email],
      function (err, results, fields) {
        if (err) throw err;

        let count;
        if (Object.keys(results).length === 0) {
          count = 0;
        } else {
          let result = Object.values(JSON.parse(JSON.stringify(results[0])))[0];
          count = result["COUNT(*)"];
        }
        res.send(count >= 1);
      }
    );       
});


/*  "/api/event/delete-student-from-event"
 *   POST: Deletes student frorm event
 *   Takes the following parameters:
 *      event name, event start time
 *      student email
 */

  router.post("/api/event/delete-student-from-event", auth.checkJwt, function(req, res){
    const startTimeDate = new Date(req.body.event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 

    database.execute(
      'CALL deleteStudentFromEvent(?, ?, ?)',
      [req.body.event.event_name, startTimeDate, req.body.student_email],
      function (err, results, fields) {
        if (err) throw err;
        res.send({success: true});
      }
    );       
                               
  });

/*  "/api/event/get-event-registrees/:name/:startime"
 *   GET: Gets all event registrees
 *   Retrieves the following information:
 *      event name, event start time
 *      student email
 */
  
  router.get("/api/event/get-event-registrees/:name/:startime", auth.checkJwt, function (req, res) {
    const startTimeDate = new Date(req.params.startime)
    .toLocaleString('sv').replace(' ', 'T'); 
  
    database.execute(
      'CALL getEventRegistrees(?, ?)',
      [req.params.name, startTimeDate],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        res.send({registrees: result});
      }
    );   
  });

  /*  "/api/event/get-voicepart-limit/"
 *   POST: Return voicepart limits and signup counts from a specific event
 *   Retrieves the following information:
 *      voicepart name, number, maximum 
 */
  
  router.post("/api/event/get-voicepart-limit/", auth.checkJwt, function (req, res) {
    const event = req.body;

    const startTimeDate = new Date(event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 

    database.execute(
      "CALL getVoicepartLimit(?, ?)",
      [event.event_name, startTimeDate],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        console.log(results);

        console.log(result);
        res.send(result);
      }
    );   
  });

  /*  "/api/event/update-voicepart-limit/"
 *   POST: Updates a voicepart limit for an event
 */
  
  router.post("/api/event/update-voicepart-limit/", auth.checkJwt, function (req, res) {
    const event = req.body.event;
    const voicepartLimit = req.body.voicepartLimit;

    const startTimeDate = new Date(event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 

    console.log(`CALL updateVoicepartLimit('${event.event_name}, '${startTimeDate}', '${voicepartLimit.voicepart_name}', ${voicepartLimit.number}, ${voicepartLimit.maximum});`);

    database.execute(
      "CALL updateVoicepartLimit(?, ?, ?, ?, ?)",
      [event.event_name, startTimeDate, voicepartLimit.voicepart_name, voicepartLimit.number, voicepartLimit.maximum],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        res.send(result);
      }
    );   
  });

  /*  "/api/event/add-voicepart-limit/"
 *   POST: Adds a voicepart limit for an event
 */
  
  router.post("/api/event/add-voicepart-limit/", auth.checkJwt, function (req, res) {
    const event = req.body.event;
    const voicepartLimit = req.body.voicepartLimit;

    const startTimeDate = new Date(event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 

    console.log(`CALL addVoicepartLimit('${event.event_name}', '${startTimeDate}', '${voicepartLimit.voicepart_name}'. ${voicepartLimit.number}, ${voicepartLimit.maximum})`)
    database.execute(
      "CALL addVoicepartLimit(?, ?, ?, ?, ?)",
      [event.event_name, startTimeDate, voicepartLimit.voicepart_name, voicepartLimit.number, voicepartLimit.maximum],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        res.send(result);
      }
    );   
  });

  /*  "/api/event/delete-voicepart-limit/"
 *   POST: Removes a voicepart limit from an event
 */
  
  router.post("/api/event/delete-voicepart-limit/", auth.checkJwt, function (req, res) {
    const event = req.body.event;
    const voicepartLimit = req.body.voicepartLimit;

    const startTimeDate = new Date(event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 

    console.log(`CALL deleteVoicepartLimit('${event.event_name}', '${startTimeDate}', '${voicepartLimit.voicepart_name}'. ${voicepartLimit.number})`)
    database.execute(
      "CALL deleteVoicepartLimit(?, ?, ?, ?)",
      [event.event_name, startTimeDate, voicepartLimit.voicepart_name, voicepartLimit.number],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        res.send(result);
      }
    ); 
      
  });

  /*  "/api/event/get-signup-counts/"
 *   POST: Return all signup counts (regardless of any existing limit) from a specific event
 *   Retrieves the following information:
 *      voicepart name, voicepart number, signed up count 
 */

  router.post("/api/event/get-signup-counts/", auth.checkJwt, function (req, res) {
    const event = req.body;

    const startTimeDate = new Date(event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 
    console.log(`CALL getSignupCounts(${event.event_name}, ${startTimeDate})`);
    database.execute(
      "CALL getSignupCounts(?, ?)",
      [event.event_name, startTimeDate],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        res.send(result);
      }
    );   
  });


  /*  "/api/event/get-voicepart-details/:name/:startime/:email"
 *   GET: Gets voicepart details for a specific student in a specific event
 *   Retrieves the following information:
 *      event name, event start time
 *      student email
 */
  
  router.get("/api/event/get-voicepart-details/:name/:startime/:email", auth.checkJwt, function (req, res) {
    const startTimeDate = new Date(req.params.startime)
    .toLocaleString('sv').replace(' ', 'T'); 
  
    database.execute(
      'CALL getVoicePartDetails(?, ?, ?)',
      [req.params.name, startTimeDate, req.params.email],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        res.send({details: result});
      }
    );   
  });
    
  return router;
}
