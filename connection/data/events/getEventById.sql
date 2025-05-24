-- File:connection/data/events/getEventById.sql

SELECT
    eventId,
    eventTitle,
    eventDescription,
    startDate,
    endDate,
    avenue,
    maxMembers,
    createdAt,
    updatedAt
FROM
    Events
WHERE
    eventId = @eventId AND deletedAt IS NULL;

-- This query retrieves a specific event from the Events table by its eventId, ensuring that the event has not been deleted (i.e., where deletedAt is NULL).