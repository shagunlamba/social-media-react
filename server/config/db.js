const mysql = require('mysql2');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Marin_2000',
  database : 'SocialMedia'
});

module.exports = db;