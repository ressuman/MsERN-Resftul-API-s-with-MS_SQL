// File: index.js

"use strict";

const express = require("express");
const cors = require("cors");
const config = require("./connection/db/config");
const connectDB = require("./connection/db/database");
const { testConnection } = require("./connection/db/database");

//const eventRoutes = require("./routes/eventRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
//app.use("/api", eventRoutes.routes);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const dbHealthy = await connectDB();
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      database: dbHealthy ? "Connected" : "Disconnected",
      server: {
        host: process.env.HOST,
        port: process.env.PORT,
        environment: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      error: error.message,
    });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Event Management API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      api: "/api/v1",
      events: "/api/v1/events",
    },
  });
});

// Test database connection on startup
const initializeApp = async () => {
  try {
    console.log("🚀 Starting Event Management API...");
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🖥️  Server: ${process.env.HOST}:${process.env.PORT}`);

    // Test database connection
    console.log("🔍 Testing database connection...");
    const dbConnected = await testConnection();
    console.log("✅ Database connection successful");
    if (!dbConnected) {
      throw new Error("Database connection failed");
    }

    // Start server
    const server = app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`🎉 Server running at ${process.env.HOST_URL}`);
      console.log(`📡 API endpoint: ${process.env.HOST_URL}/api`);
      console.log(`🏥 Health check: ${process.env.HOST_URL}/health`);
      console.log("✨ Ready to accept connections!");
    });
  } catch (error) {
    console.error("💥 Failed to start application:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
};

// Global error handlers
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error.message);
  console.error("Stack trace:", error.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Initialize the application
initializeApp();

module.exports = app;
