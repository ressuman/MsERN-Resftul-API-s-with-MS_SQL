// File: connection/db/database.js
const sql = require("mssql");
const config = require("./config");

const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to MSSQL database:", process.env.DB_NAME);
    return pool;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

const testConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Testing database connection...");
    await pool.request().query("SELECT 1");
    return true;
  } catch (err) {
    console.error("❌ Test connection failed:", err.message);
    return false;
  }
};

module.exports = connectDB;
module.exports.testConnection = testConnection;
