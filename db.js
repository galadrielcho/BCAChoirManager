require('dotenv').config();
var mysql = require('mysql2');
var database;

function connectDatabase() {
  if (!database) {
    var database = mysql.createConnection({
      host     : process.env.HOST,
      user     : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DB
    });  

    database.connect(function(err){
        if(err) {
          console.log('Error connecting database!');
        }
    });
  }
  return database;
}

module.exports = connectDatabase();
