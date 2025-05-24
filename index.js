// File: index.js

"use strict";

const express = require("express");
const cors = require("cors");
const config = require("./connection/db/config");
const {
  getPool,
  testConnection,
  closePool,
} = require("./connection/db/database");
//const eventRoutes = require("./routes/eventRoutes");

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
    const dbHealthy = await testConnection();
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      database: dbHealthy ? "Connected" : "Disconnected",
      server: {
        host: config.host,
        port: config.port,
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
    console.log(`🖥️  Server: ${config.host}:${config.port}`);

    // Test database connection
    console.log("🔍 Testing database connection...");
    const dbConnected = await testConnection();
    if (!dbConnected) {
      throw new Error("Database connection failed");
    }

    // Start server
    const server = app.listen(config.port, config.host, () => {
      console.log(`🎉 Server running at ${config.url}`);
      console.log(`📡 API endpoint: ${config.url}/api`);
      console.log(`🏥 Health check: ${config.url}/health`);
      console.log("✨ Ready to accept connections!");
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      console.log(`\n📡 Received ${signal}. Starting graceful shutdown...`);

      server.close(async () => {
        console.log("🔒 HTTP server closed");

        // Close database connections
        await closePool();

        console.log("👋 Graceful shutdown completed");
        process.exit(0);
      });
    };

    // Handle shutdown signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGUSR2", () => gracefulShutdown("SIGUSR2")); // For nodemon
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
