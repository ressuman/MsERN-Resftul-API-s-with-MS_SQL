-- File:connection/data/events/patchEvent.sql

UPDATE Events
SET
    eventTitle = ISNULL(@eventTitle, eventTitle),
    eventDescription = ISNULL(@eventDescription, eventDescription),
    startDate = ISNULL(@startDate, startDate),
    endDate = ISNULL(@endDate, endDate),
    avenue = ISNULL(@avenue, avenue),
    maxMembers = ISNULL(@maxMembers, maxMembers),
    updatedAt = GETDATE()
WHERE
    eventId = @eventId AND deletedAt IS NULL;

SELECT * FROM Events WHERE eventId = @eventId AND deletedAt IS NULL;
--
-- This query updates an existing event in the Events table with the provided details, allowing for partial updates (i.e., only updating fields that are provided), and returns the updated event.