var database = require('../db');
var auth = require('../auth');

const router = require('express').Router();

module.exports = function () {
  
/*  "/api/get-admins"
 *   GET: Gets all admins
 *   Retrieves the following information:
 *      first_name, last_name, email
 */

  router.get("/api/get-admins", auth.checkJwt, function (req, res) {
    database.execute(
      'CALL getAdmins()',
      [],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        res.send({admins: result});
      }
    );   

  });

  /*  "/api/get-content"
 *   GET: Gets all stored content from database
 *   Retrieves the following information:
 *      about, group1, group2, conductor
 */

  router.get("/api/get-content", function (req, res) {
    database.execute(
      'CALL getContent()',
      [],
      function (err, results, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results[0])));
        res.send({content: result});
      }
    );   

  });
 /*  "/api/get-content"
 *   POST: Posts changes to content from admin
 *   Takes the following parameters:
 *      about, group1, group2, conductor
 */
  router.post("/api/post-content", function (req, res) {
    database.execute(
      'CALL updateContent(?, ?, ?, ?)',
      [req.body[0], req.body[1], req.body[2], req.body[3]],
      function (err, results, fields) {
        if (err) throw err;
      }
    );   

  });

  /*  "/api/delete-old-accounts"
 *   POST: Deletes accounts from previous grad years
 *   Takes the following parameters:
 *      none
 */
  router.post("/api/delete-old-accounts", function (req, res) {
    database.execute(
      'CALL deleteOldAccounts()',
      [],
      function (err, results, fields) {
        if (err) throw err;
      }
    ); 

  });

/*  "/api/delete-account"
 *   POST: Deletes account if exists
 *   Takes the following parameters:
 *      email
 */
  
  router.post('/api/delete-account', auth.checkJwt, (req, res) => {
    // get account if it exists
    database.execute(
      'CALL deleteAccount(?)',
      [req.body[0]],
      function (err, results, fields) {
        if (err) throw err;
        res.send({success: true});
      }
    );   
  });

  /*  "/api/sign-up"
 *   POST: Creates account
 *   Takes the following parameters:
 *      email, first name, last name, pronouns, 
 *      voicepart name and number, choir name, grad year
 */

  // TO DO: Convert to object
  router.post("/api/sign-up", auth.checkJwt, function (req, res) {
    let email = req.body[0];
    let first_name = req.body[1];
    let last_name = req.body[2];
    let pronouns = req.body[3];
    let voicepart_name = req.body[4];
    let voicepart_number = req.body[5];
    let choir_name = req.body[6];
    let grad_year = req.body[7];


    database.execute(
      'CALL signupAccount(?, ?, ?, ?, ?, ?, ?, ?)',
      [email, first_name, last_name, pronouns, voicepart_name, voicepart_number, choir_name, grad_year],
      function (err, results, fields) {
        if (err) throw err;
      }
    );   

  });

/*  "/api/get-account/:email"
*   GET: Gets the data of a generic account.
*   Retrieves the following information:
*      first name, last name, pronouns, is_admin
*/

router.get("/api/get-account/:email", auth.checkJwt, function (req, res) {
  database.execute(
    'CALL getAccount(?)',
    [req.params.email], 
    function(err, account, fields) {
      if (err) throw err;

      if (Object.keys(account).length === 0) {
        res.send({details : account});
      } else {
        let result = Object.values(JSON.parse(JSON.stringify(account[0])))[0];
        res.send({details: result});
      }
    });

  });
  

/*  "/api/get-all-accounts/"
*   GET: Gets the data of all accounts without admin information
*   Retrieves the following information:
*      first name, last name, pronouns
*/

  // TO DO: Convert to object
  router.get("/api/get-all-accounts", auth.checkJwt, function (req, res) {
      database.execute(
        "CALL getAllAccounts()", 
        [],
        function(err, rows, fields) 
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


/*  "/api/get-all-accounts/"
*   GET: Gets the data of all accounts without admin information
*   Retrieves the following information:
*      first name, last name, pronouns
*/

  router.post('/api/check-admin', auth.checkJwt, (req, res) => {
    database.execute(
        "CALL isAdmin(?)",
        [req.body[0]],
        function(err, account, fields) {
          if (err) throw err;
          let result = Object.values(JSON.parse(JSON.stringify(account[0])));
          if(result[0] == undefined){
            res.send({exists: false});
          }
          else if(result[0].is_admin.data == 0){
            res.send({exists: false});
          }
          else{
            res.send({exists: true});
          }
    });
  }); 


/*  "/api/add-admin/"
*   POST: Creates a new admin account
*   Takes the following parameters:
*      email, first name, last name
*/


router.post('/api/add-admin', auth.checkJwt, (req, res) => {
database.execute(
  "CALL addAdmin(?, ?, ?)",
  [req.body[0], req.body[1], req.body[2]],
  function(err, account, fields) {
    if (err) throw err;
    res.send({added: true});
  });
});

/*  "/api/is-admin/:email"
*   GET: Checks if user is an admin
*   Returns a boolean value
*/

  router.get("/api/is-admin/:email", auth.checkJwt, function (req, res) {
      sql = `CALL isAdmin("${req.params.email}");`
    
      database.execute(
        "CALL isAdmin(?)",
        [req.params.email],
        function(err, isAdmin, fields) {
          if (Object.keys(isAdmin).length === 0) res.send(false);

          let result = Object.values(JSON.parse(JSON.stringify(isAdmin[0])))[0];
          res.send(result.is_admin.data[0] == 1);
      
        });
    });

  return router;
}
