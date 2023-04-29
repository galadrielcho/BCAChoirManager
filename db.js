require('dotenv').config();
var mysql = require('mysql2');
var database;

function connectDatabase() {
  if (!database) {
    var database = mysql.createPool({
      host     : process.env.HOST,
      user     : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DB,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0
    
    });  
  }
  return database;
}

module.exports = connectDatabase();
