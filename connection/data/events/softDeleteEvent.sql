-- File:connection/data/events/softDeleteEvent.sql

UPDATE Events
SET deletedAt = GETDATE(), updatedAt = GETDATE()
WHERE eventId = @eventId;

SELECT @eventId AS deletedEventId;
--
-- This query marks an event as deleted by setting the deletedAt timestamp and updatedAt timestamp, effectively soft-deleting the event.