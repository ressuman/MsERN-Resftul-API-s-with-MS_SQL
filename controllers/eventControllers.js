// File:controllers/eventControllers.js
"use strict";

const eventData = require("../methods/events");

// GET /events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventData.getEvents();

    res.status(200).json({
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// GET /events/:id
const getEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    const event = await eventData.getById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event fetched successfully",
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// POST /events
const addEvent = async (req, res) => {
  try {
    const data = req.body;

    const created = await eventData.createEvent(data);

    res.status(201).json({
      message: "Event created successfully",
      data: created,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// PUT /events/:id
const updateEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    const data = req.body;

    const updated = await eventData.updateEvent(eventId, data);
    if (!updated) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// PATCH /events/:id
const patchEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    const data = req.body;

    const patched = await eventData.patchEvent(eventId, data);
    if (!patched) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.status(200).json({
      message: "Event patched successfully",
      data: patched,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// SOFT DELETE /events/:id
const softDeleteEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    const deleted = await eventData.softDeleteEvent(eventId);

    res.status(200).json({
      message: "Event soft deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// HARD DELETE /events/hard/:id
const hardDeleteEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    const deleted = await eventData.hardDeleteEvent(eventId);

    res.status(200).json({
      message: "Event deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  addEvent,
  updateEvent,
  patchEvent,
  softDeleteEvent,
  hardDeleteEvent,
};
