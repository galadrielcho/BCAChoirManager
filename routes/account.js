var database = require('../db');

const router = require('express').Router();

module.exports = function () {

    router.get("/api/get-admins", function (req, res) {
      sql = `CALL getAdmins();`
      database.query(sql, function(err, admins, fields) 
      {
      if (err) throw err;
    
      let result = Object.values(JSON.parse(JSON.stringify(admins[0])));
    
      res.send({admins: result});
      });
    });           
    
    router.post('/api/delete-account', (req, res) => {
      // get account if it exists
      sql = `CALL deleteAccount(${database.escape(req.body[0])});`
      database.query(sql, function(err, account, fields) {
        if (err){
          throw err;
        }
        res.send({success: true});
      });
    });

    router.post("/api/sign-up", function (req, res) {

        const email = database.escape(req.body[0]);
        const first_name = database.escape(req.body[1]);
        const last_name = database.escape(req.body[2]);
        const pronouns = database.escape(req.body[3]);
        const voicepart_name = database.escape(req.body[4]);
        const voicepart_number = database.escape(req.body[5]);
        const choir_name = database.escape(req.body[6]);
        const grad_year = database.escape(req.body[7]);


        // insert into account
        sql = `CALL signupAccount(${email}, ${first_name}, 
              ${last_name}, ${pronouns}, ${voicepart_name},
              ${voicepart_number}, ${choir_name}, ${grad_year});`
        
        database.query(sql, function(err, rows, fields) 
          {
            if (err) throw err;
          }); 
    });

/*  "/api/get-account/:email"
*   GET: Gets the data of a generic account.
*   Retrieves the following infromation:
*      first name, last name, pronouns, is_admin
*/

  router.get("/api/get-account/:email", function (req, res) {
    sql = `CALL getAccount("${req.params.email}");`
  
    database.query(sql, function(err, account, fields) {
      let result = Object.values(JSON.parse(JSON.stringify(account[0])))[0];
      if (err) throw err;
      res.send({details: result});
      });
  
    });

    router.get("/api/email-recipients-input", function (req, res) {
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
    
    router.post('/api/check-admin', (req, res) => {
        const email = database.escape(req.body[0]);
        const first_name = database.escape(req.body[1]);
        const last_name = database.escape(req.body[2]);

      // get account if it exists
      sql = `CALL getAccount(${database.escape(req.body[0])});`
      database.query(sql, function(err, account, fields) {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(account[0])));
        if(result[0] == undefined){
          res.send({exists: false});
        }
        else{
          res.send({exists: true});
        }
      });
    });
    router.post('/api/check-admin', (req, res) => {
      // get account if it exists
      sql = `CALL getAccount(${database.escape(req.body[0])});`
      database.query(sql, function(err, account, fields) {
        if (err) throw err;
        console.log("in query");
        let result = Object.values(JSON.parse(JSON.stringify(account[0])));
        console.log(result[0]);
        if(result[0] == undefined){
          res.send({exists: false});
        }
        else if(result[0].is_admin == 0){
          res.send({exists: false});
        }
        else{
          res.send({exists: true});
        }
      });
    });
    router.post('/api/delete-account', (req, res) => {
      const email = req.body;
      sql = `DELETE FROM account WHERE email = ${database.escape(email[0])};`;
      database.query(sql, function(err, rows, fields) 
      {
          if (err) throw err;
      });  
  });
  router.post('/api/add-admin', (req, res) => {

  // get account if it exists
  sql = `CALL addAdmin(${database.escape(req.body[0])}, ${database.escape(req.body[1])}, ${database.escape(req.body[2])});`
  database.query(sql, function(err, account, fields) {
    if (err) throw err;
      res.send({added: true});
  });
});

/*  "/api/is-admin/:email"
*   GET: Checks if user is an admin
*   Returns a boolean value
*/

    router.get("/api/is-admin/:email", function (req, res) {
        sql = `CALL isAdmin("${req.params.email}");`
      
        database.query(sql, function(err, isAdmin, fields) 
    
        {
        let result = Object.values(JSON.parse(JSON.stringify(isAdmin[0])))[0];
      
        res.send(result.is_admin.data[0] == 1);
      
        });
      });

    

    return router;
}
