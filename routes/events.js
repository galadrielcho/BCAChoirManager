
var database = require('../db');
const router = require('express').Router();

module.exports = function () {
    router.post("/api/event/event-create/", function(req, res){
        const event = req.body;
        const startTimeDate = new Date(event.start_time)
        .toLocaleString('sv').replace(' ', 'T'); 
        const endTimeDate = new Date(event.end_time)
        .toLocaleString('sv').replace(' ', 'T'); 
      
      
        sql = `
          INSERT INTO event(event_name, start_time, end_time, location, address)
          VALUES ("${event.event_name}", '${startTimeDate}', '${endTimeDate}', "${event.location}", "${event.address}")`;
      
        database.query(sql, function(err, rows, fields) 
            {
              if (err) throw err;
            }
          );  
                  
      
    });

    router.post("/api/event/event-edit/", function(req, res) {
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
    
    database.query(sql, function(err, rows, fields) 
        {
            if (err) throw err;
        }
        );  
                    
    });
      
    router.get("/api/event/get-events-in-range/:starttime/:endtime/", function(req, res){
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
      
      });
    
    router.delete('/api/event/:name/:starttime/:endtime/', (req, res) => {
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

 /*  "/api/get-all-events"
 *   GET: Gets all events
 *   Retrieves the following infromation:
 *      event name, start time, end time, location,
 *      address, and choir type
 */

    router.get("/api/event/get-all-events", function (req, res) {
        sql = `	SELECT event_name, start_time, end_time, location, address, choir_type.choir_name as choir_type
        FROM event
        INNER JOIN choir_type
        ON event.choir_type_id = choir_type.choir_type_id`
        database.query(sql, function(err, events, fields) 
        {
        if (err) throw err;
        res.send({events : events});
        });});

/*  "/api/event/add-student-to-event/"
 *   POST: Adds student to event
 *   Takes the following parameters
 *      event name, event start time
 *      student email, voice part, voice part number
 */


    router.post("/api/event/add-student-to-event/", function(req, res){
        const startTimeDate = new Date(req.body.event.start_time)
                                    .toLocaleString('sv').replace(' ', 'T'); 

        sql = `CALL addStudentToEvent('${req.body.event.event_name}', '${startTimeDate}',`
                                    +`'${req.body.student_email}', '${req.body.voicepart_name}',`
                                    +`${req.body.voicepart_number})`;                                  
        database.query(sql, function(err, rows, fields) 
        {
        if (err) throw err;
        });  
  
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

    sql = `CALL countStudentInEvent('${req.body.event.event_name}', '${startTimeDate}', `
                                  +`'${req.body.student_email}')`;     

    database.query(sql, function(err, rows, fields) 
    {
      if (err) throw err;
      let result = Object.values(JSON.parse(JSON.stringify(rows[0])))[0];

      count = result["COUNT(*)"];
      res.send(count >= 1);
    });  
  
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

    sql = `CALL deleteStudentFromEvent('${req.body.event.event_name}', '${startTimeDate}', 
                                  '${req.body.student_email}')`;   

    database.query(sql, function(err, rows, fields) 
    {
        if (err) throw err;
    });  
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
  
    sql = `CALL getEventRegistrees("${req.params.name}", "${startTimeDate}");`
  
    database.query(sql, function(err, registrees, fields) 
    
    {
    let result = Object.values(JSON.parse(JSON.stringify(registrees[0])));
    if (err) throw err;
    res.send({registrees: result});
    });
    });
  

    return router;
}
