// File: connection/db/config.js

"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  NODE_ENV,
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

assert(DB_SERVER, "DB_SERVER is required");
assert(DB_PORT, "DB_PORT is required");
assert(DB_NAME, "DB_NAME is required");
assert(DB_USER, "DB_USER is required");
assert(DB_PASSWORD, "DB_PASSWORD is required");

const sqlEncrypt = DB_ENCRYPT === "true";
const trustServerCertificate = DB_TRUST_SERVER_CERTIFICATE === "true";

// Handle named instance configuration
const config = {
  server: DB_SERVER,
  port: parseInt(DB_PORT || "1433", 10), // Default port is 1433
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,

  // Connection pool settings
  pool: {
    max: parseInt(DB_POOL_MAX || "10", 10),
    min: parseInt(DB_POOL_MIN || "2", 10),
    idleTimeoutMillis: 30000,
  },

  // Request timeout
  requestTimeout: parseInt(DB_REQUEST_TIMEOUT || "15000", 10),
  connectionTimeout: parseInt(DB_CONNECTION_TIMEOUT || "15000", 10),

  // Security settings
  options: {
    encrypt: sqlEncrypt,
    trustServerCertificate:
      NODE_ENV === "development"
        ? trustServerCertificate
        : !trustServerCertificate,
    enableArithAbort: true,
  },
};

module.exports = config;
