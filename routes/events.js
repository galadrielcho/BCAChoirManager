
var database = require('../db');
const router = require('express').Router();

module.exports = function () {

/*  "/api/event/event-create/"
 *   POST: Creates an event
 *   Takes the following parameters within an event object:
 *      name, start time, end time, location, address
*/

  router.post("/api/event/event-create/", function(req, res){
    const event = req.body;
    const startTimeDate = new Date(event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 
    const endTimeDate = new Date(event.end_time)
    .toLocaleString('sv').replace(' ', 'T'); 
  
    database.execute(
      'CALL createEvent(?, ?, ?, ?, ?)',
      [event.event_name, startTimeDate, endTimeDate, event.location, event.address],
      function (err, results, fields) {
        if (err) throw err;
      });
  });

  
/*  "/api/event/event-edit/"
 *   POST: Edits an event
 *   Takes the following parameters:
 *      orig_event (Event object), new_event (Event object)
*/

  router.post("/api/event/event-edit/", function(req, res) {
    const orig_event = req.body.orig_event;
    const new_event = req.body.new_event;
    
    const orig_startTimeDate = new Date(orig_event.start_time).toLocaleString('sv').replace(' ', 'T'); 
    const new_startTimeDate = new Date(new_event.start_time).toLocaleString('sv').replace(' ', 'T'); // format into ISO but local time
    const new_endTimeDate = new Date(new_event.end_time).toLocaleString('sv').replace(' ', 'T');

    // TO DO ! Add in event registration toggle
    database.execute(
      'CALL updateEvent(?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [orig_event.event_name, orig_startTimeDate, new_event.event_name, new_startTimeDate, 
        new_endTimeDate, new_event.location, new_event.address, orig_event.choir_type == "Concert" ? 1: 2, 0],
      function (err, results, fields) {
        if (err) throw err;
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
    

/*  "/api/event/get-events-in-range/:starttime/:endtime/"
 *   GET: Gets all events within a specific time range
 *   Takes the following parameters:
 *      start time, end time
*/

  router.delete('/api/event/:name/:starttime/', (req, res) => {
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

  router.post("/api/event/add-student-to-event/", function(req, res){
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

  router.post("/api/event/check-student-in-event/", function(req, res){
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

  router.post("/api/event/delete-student-from-event", function(req, res){
    const startTimeDate = new Date(req.body.event.start_time)
    .toLocaleString('sv').replace(' ', 'T'); 

    database.execute(
      'CALL deleteStudentFromEvent(?, ?, ?)',
      [req.body.event.event_name, startTimeDate, req.body.student_email],
      function (err, results, fields) {
        if (err) throw err;
      }
    );       
                               
  });

/*  "/api/event/get-event-registrees/:name/:startime"
 *   GET: Gets all event registrees
 *   Retrieves the following information:
 *      event name, event start time
 *      student email
 */
  
  router.get("/api/event/get-event-registrees/:name/:startime", function (req, res) {
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
    
  return router;
}
