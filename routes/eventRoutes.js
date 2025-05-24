// File: routes/eventRoutes.js

"use strict";

const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventControllers");
const {
  getAllEvents,
  getEvent,
  addEvent,
  updateEvent,
  patchEvent,
  softDeleteEvent,
  hardDeleteEvent,
} = eventController;

// GET all events (excluding soft-deleted)
router.get("/all-events", getAllEvents);

// GET a specific event by ID
router.get("/:id/event", getEvent);

// POST a new event
router.post("/create", addEvent);

// PUT - full update of an event
router.put("/:id/update", updateEvent);

// PATCH - partial update of an event
router.patch("/:id/patch", patchEvent);

// SOFT DELETE - mark an event as deleted
router.delete("/:id/soft", softDeleteEvent);

// HARD DELETE - permanently delete an event
router.delete("/hard/:id", hardDeleteEvent);

module.exports = router;
