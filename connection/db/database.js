// File: connection/db/database.js
const sql = require("mssql");
const config = require("./config");

// Connection pool
let pool;

const getPool = async () => {
  if (!pool) {
    try {
      pool = await sql.connect(config.sql);
      console.log("✅ Connected to SQL Server successfully");
      console.log(`📊 Database: ${config.sql.database}`);
      console.log(`🖥️  Server: ${config.sql.server}:${config.sql.port}`);
    } catch (error) {
      console.error("❌ Database connection failed:", error.message);
      throw error;
    }
  }
  return pool;
};

// Graceful shutdown
const closePool = async () => {
  if (pool) {
    try {
      await pool.close();
      pool = null;
      console.log("🔌 Database connection closed");
    } catch (error) {
      console.error("❌ Error closing database connection:", error.message);
    }
  }
};

// Test connection
const testConnection = async () => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT 1 as test");
    console.log("🔍 Database connection test: PASSED");
    return true;
  } catch (error) {
    console.error("🔍 Database connection test: FAILED", error.message);
    return false;
  }
};

// Export functions
module.exports = {
  getPool,
  closePool,
  testConnection,
  sql,
};

// Handle process termination
process.on("SIGTERM", closePool);
process.on("SIGINT", closePool);
process.on("SIGUSR2", closePool); // For nodemon restarts
