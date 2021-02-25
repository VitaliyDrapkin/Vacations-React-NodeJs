const ServerError = require("./../errors/server-error");
const ErrorType = require("./../errors/error-type");
const mysql = require("mysql2");

// Connection to sql DB
const connection = mysql.createConnection({
  multipleStatements: true,
  host: "localhost", // Computer
  user: "root", // Username
  password: "1234", // Password
  database: "vacationProject", // Database name
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
