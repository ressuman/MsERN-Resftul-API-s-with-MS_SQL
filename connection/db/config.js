// File: connection/db/config.js

"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SERVER,
  DB_PORT,
  DB_ENCRYPT,
  DB_TRUST_SERVER_CERTIFICATE,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_REQUEST_TIMEOUT,
  DB_CONNECTION_TIMEOUT,
} = process.env;

// Validation
assert(PORT, "PORT is required");
assert(HOST, "HOST is required");
assert(DB_SERVER, "DB_SERVER is required");
assert(DB_NAME, "DB_NAME is required");
assert(DB_USER, "DB_USER is required");
assert(DB_PASSWORD, "DB_PASSWORD is required");

const sqlEncrypt = DB_ENCRYPT === "true";
const trustServerCertificate = DB_TRUST_SERVER_CERTIFICATE === "true";

// Handle named instance configuration
const serverConfig = {
  server: DB_SERVER,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,

  // Connection pool settings
  pool: {
    max: parseInt(DB_POOL_MAX || "10"),
    min: parseInt(DB_POOL_MIN || "2"),
    idleTimeoutMillis: 30000,
  },

  // Request timeout
  requestTimeout: parseInt(DB_REQUEST_TIMEOUT || "15000"),
  connectionTimeout: parseInt(DB_CONNECTION_TIMEOUT || "15000"),

  // Security settings - adjusted for SQL Server Express
  options: {
    encrypt: sqlEncrypt,
    trustServerCertificate: trustServerCertificate,
    enableArithAbort: true,
    instanceName: DB_SERVER.includes("\\")
      ? DB_SERVER.split("\\")[1]
      : undefined,
  },
};

// Only add port if it's specified and not using named instance
if (DB_PORT && !DB_SERVER.includes("\\")) {
  serverConfig.port = parseInt(DB_PORT);
}

module.exports = {
  // Server configuration
  port: PORT,
  host: HOST,
  url: HOST_URL,

  // SQL Server configuration
  // sql: {
  //   server: DB_SERVER,
  //   port: parseInt(DB_PORT || "1433"),
  //   database: DB_NAME,
  //   user: DB_USER,
  //   password: DB_PASSWORD,

  //   // Connection pool settings
  //   pool: {
  //     max: parseInt(DB_POOL_MAX || "10"),
  //     min: parseInt(DB_POOL_MIN || "2"),
  //     idleTimeoutMillis: 30000,
  //   },

  //   // Request timeout
  //   requestTimeout: parseInt(DB_REQUEST_TIMEOUT || "15000"),
  //   connectionTimeout: parseInt(DB_CONNECTION_TIMEOUT || "15000"),

  //   // Security settings
  //   options: {
  //     encrypt: sqlEncrypt,
  //     trustServerCertificate: trustServerCertificate,
  //     enableArithAbort: true,
  //   },
  // },
  sql: serverConfig,
};
