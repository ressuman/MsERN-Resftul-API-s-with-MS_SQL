-- File:connection/data/events/updateEvent.sql

UPDATE Events
SET
    eventTitle = @eventTitle,
    eventDescription = @eventDescription,
    startDate = @startDate,
    endDate = @endDate,
    avenue = @avenue,
    maxMembers = @maxMembers,
    updatedAt = GETDATE()
WHERE
    eventId = @eventId AND deletedAt IS NULL;

SELECT * FROM Events WHERE eventId = @eventId AND deletedAt IS NULL;

-- This query updates an existing event in the Events table with the provided details and returns the updated event.