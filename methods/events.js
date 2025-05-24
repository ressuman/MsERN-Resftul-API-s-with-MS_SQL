// File:methods/events.js

"use strict";

const sql = require("mssql");
const loadSqlQueries = require("../utils/loadAllSql");
const dbConfig = require("../connection/db/config");

const getEvents = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    const sqlQueries = await loadSqlQueries("events");
    const result = await pool.request().query(sqlQueries.getAllEvents);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching events:", error.message);
    throw error;
  }
};

const getById = async (eventId) => {
  try {
    const pool = await sql.connect(dbConfig);
    const sqlQueries = await loadSqlQueries("events");
    const result = await pool
      .request()
      .input("eventId", sql.Int, eventId)
      .query(sqlQueries.getEventById);
    return result.recordset[0];
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error.message);
    throw error;
  }
};

const createEvent = async (eventData) => {
  try {
    const pool = await sql.connect(dbConfig);
    const sqlQueries = await loadSqlQueries("events");
    const result = await pool
      .request()
      .input("eventTitle", sql.NVarChar(100), eventData.eventTitle)
      .input("eventDescription", sql.NVarChar(1500), eventData.eventDescription)
      .input("startDate", sql.Date, eventData.startDate)
      .input("endDate", sql.Date, eventData.endDate)
      .input("avenue", sql.NVarChar(200), eventData.avenue)
      .input("maxMembers", sql.Int, eventData.maxMembers)
      .query(sqlQueries.createEvent);
    return result.recordset;
  } catch (error) {
    console.error("Error creating event:", error.message);
    throw error;
  }
};

const updateEvent = async (eventId, eventData) => {
  try {
    const pool = await sql.connect(dbConfig);
    const sqlQueries = await loadSqlQueries("events");
    const result = await pool
      .request()
      .input("eventId", sql.Int, eventId)
      .input("eventTitle", sql.NVarChar(100), eventData.eventTitle)
      .input("eventDescription", sql.NVarChar(1500), eventData.eventDescription)
      .input("startDate", sql.Date, eventData.startDate)
      .input("endDate", sql.Date, eventData.endDate)
      .input("avenue", sql.NVarChar(200), eventData.avenue)
      .input("maxMembers", sql.Int, eventData.maxMembers)
      .query(sqlQueries.updateEvent);
    return result.recordset;
  } catch (error) {
    console.error(`Error updating event ${eventId}:`, error.message);
    throw error;
  }
};

const patchEvent = async (eventId, eventData) => {
  try {
    const pool = await sql.connect(dbConfig);
    const sqlQueries = await loadSqlQueries("events");
    const request = pool.request().input("eventId", sql.Int, eventId);

    request.input(
      "eventTitle",
      sql.NVarChar(100),
      eventData.eventTitle || null
    );
    request.input(
      "eventDescription",
      sql.NVarChar(1500),
      eventData.eventDescription || null
    );
    request.input("startDate", sql.Date, eventData.startDate || null);
    request.input("endDate", sql.Date, eventData.endDate || null);
    request.input("avenue", sql.NVarChar(200), eventData.avenue || null);
    request.input("maxMembers", sql.Int, eventData.maxMembers || null);

    const result = await request.query(sqlQueries.patchEvent);
    return result.recordset;
  } catch (error) {
    console.error(`Error patching event ${eventId}:`, error.message);
    throw error;
  }
};

const softDeleteEvent = async (eventId) => {
  try {
    const pool = await sql.connect(dbConfig);
    const sqlQueries = await loadSqlQueries("events");
    const result = await pool
      .request()
      .input("eventId", sql.Int, eventId)
      .query(sqlQueries.softDeleteEvent);
    return result.recordset;
  } catch (error) {
    console.error(`Error soft deleting event ${eventId}:`, error.message);
    throw error;
  }
};

const hardDeleteEvent = async (eventId) => {
  try {
    const pool = await sql.connect(dbConfig);
    const sqlQueries = await loadSqlQueries("events");
    const result = await pool
      .request()
      .input("eventId", sql.Int, eventId)
      .query(sqlQueries.hardDeleteEvent);
    return result.recordset;
  } catch (error) {
    console.error(`Error hard deleting event ${eventId}:`, error.message);
    throw error;
  }
};

module.exports = {
  getEvents,
  getById,
  createEvent,
  updateEvent,
  patchEvent,
  softDeleteEvent,
  hardDeleteEvent,
};
