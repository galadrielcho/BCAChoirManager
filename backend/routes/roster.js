var database = require('../db');
const router = require('express').Router();

module.exports = function () {
    
/*  "/api/get-roster"
 *   GET: Gets roster of all registered students.
 *   Retrieves the following infromation:
 *      first name, last name, pronouns, voice part name, 
 *      voice part number, choir type, grad_year, email
 */

    router.get("/api/get-roster", function (req, res) {
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
*      voice part number, choir type, grad year
*/
  
  router.get("/api/get-student/:email", function (req, res) {
    sql = `CALL getStudent("${req.params.email}");`
  
    database.query(sql, function(err, student, fields) 
    
    {
    let result = Object.values(JSON.parse(JSON.stringify(student[0])))[0];
    if (err) throw err;
    res.send({details: result});
    });
  });


/*  "/api/roster-update/"
*   POST: Updates the data of a student account.
*   Updates the following infromation:
*   email, first name, last name, pronouns,
    voicepart name, voicepart number, choir type,
    graduation year
*/

  router.post("/api/roster-update", function (req, res) {
    let student = req.body;
  
    sql = `CALL updateStudent("${student.email}",`
      + `"${student.first_name}",`
      + `"${student.last_name}",`
      + `"${student.pronouns}",`
      + `"${student.voicepart_name}",`
      + `${student.number},`
      + `"${student.choir_name}",`
      + `${student.grad_year});`
  
      database.query(sql, function(err) 
    {
    if (err) throw err;
     });
  
  
  });


  return router;
  

}