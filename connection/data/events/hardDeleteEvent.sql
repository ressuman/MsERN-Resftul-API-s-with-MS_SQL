-- File:connection/data/events/hardDeleteEvent.sql

DELETE FROM Events
WHERE
    eventId = @eventId;

SELECT @eventId AS deletedEventId;

--
-- This query permanently deletes an event from the Events table by its eventId and returns the deleted eventId.