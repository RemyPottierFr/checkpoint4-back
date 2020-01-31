const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root', // username
  password: 'root',
  database: 'checkpoint4',
});
module.exports = connection;
