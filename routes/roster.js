var database = require('../db');
var auth = require('../auth');

const router = require('express').Router();

module.exports = function () {
    
/*  "/api/get-roster"
 *   GET: Gets roster of all registered students.
 *   Retrieves the following infromation:
 *      first name, last name, pronouns, voice part name, 
 *      voice part number, choir type, grad_year, email
 */

  router.get("/api/get-roster", auth.checkJwt, function (req, res) {
    sql = `CALL getStudentRoster();`
    database.execute(
      "CALL getStudentRoster()",
      [],
      function(err, roster, fields) {
        if (err) throw err;
        if (Object.keys(roster).length === 0) {
          res.send({roster: results});
        }
        let result = Object.values(JSON.parse(JSON.stringify(roster[0])));
        res.send({roster: result});
    });
  });
  
/*  "/api/get-student/:email"
*   GET: Gets the data of a student.
*   Retrieves the following information:
*      first name, last name, pronouns, voice part name, 
*      voice part number, choir type, grad year
*/
  
  router.get("/api/get-student/:email", auth.checkJwt, function (req, res) {  
    database.execute(
      "CALL getStudent(?)",
      [req.params.email],
      function(err, student, fields) {
        if (err) throw err;
        if (Object.keys(student).length === 0) {
          res.send({details: results});
        }

        let result = Object.values(JSON.parse(JSON.stringify(student[0])))[0];
        res.send({details: result});
      });
  });


/*  "/api/roster-update/"
*   POST: Updates the data of a student account.
*         Updates the following infromation:
*         email, first name, last name, pronouns,
*         voicepart name, voicepart number, choir type,
*         graduation year
*/

  router.post("/api/roster-update", auth.checkJwt, function (req, res) {
    let student = req.body;

    database.execute(
      "CALL updateStudent(?, ?, ?, ?, ?, ?, ?, ?)",
      [student.email, student.first_name, student.last_name, student.pronouns,
        student.voicepart_name, student.number, student.choir_name, student.grad_year],
      function(err) 
      {
        if (err) throw err;
    });
  });

  return router;


}