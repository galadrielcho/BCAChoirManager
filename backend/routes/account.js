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

    router.post("/api/sign-up", function (req, res) {
        // insert into account
        sql = `INSERT INTO account (email, first_name, last_name, pronouns, is_admin) VALUES (${database.escape(req.body[0])},${database.escape(req.body[1])}, ${database.escape(req.body[2])}, ${database.escape(req.body[3])}, 0);`
        database.query(sql, function(err, rows, fields) 
          {
            if (err) throw err;
          }); 
        
      
        // figure out voicepart_id
        sql=`SELECT voicepart_id from voicepart 
        WHERE voicepart_name = ${database.escape(req.body[4])} and number = ${database.escape(req.body[5])}`
        console.log(sql);

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
    
    router.post('/api/delete-account', (req, res) => {
        const email = req.body;
        sql = `DELETE FROM account WHERE email = ${database.escape(email[0])};`;
        database.query(sql, function(err, rows, fields) 
        {
            if (err) throw err;
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
