const mysql = require("mysql");
const util = require("util");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const db = () => {
  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
  });

  connection.connect(err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connected");
    }
  });
};

module.exports = db;
