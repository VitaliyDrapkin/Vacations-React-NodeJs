const mysql = require("mysql2");
const keys = require("../keys");

// Connection to sql DB
const connection = mysql.createConnection({
  multipleStatements: true,
  host: keys.HOST,
  user: keys.USER,
  password: keys.PASSWORD,
  database: keys.DATABASE,
});

// Connect to the database:
connection.connect((err) => {
  if (err) {
    console.log("Failed to create connection + " + err);
    return;
  }
  console.log("We're connected to MySQL");
});

// One function for executing select / insert / update / delete:
function execute(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParameters(sql, parameters) {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  execute,
  executeWithParameters,
};
