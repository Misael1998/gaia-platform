const mssql = require("mssql");

const db = async () => {
  try {
    await mssql.connect(process.env.MSSQL_URI);
    console.log("SQL server connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = db;
