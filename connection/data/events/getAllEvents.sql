-- File: connection/data/events/getAllEvents.sql

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
    deletedAt IS NULL
ORDER BY
    startDate ASC;

-- This query retrieves all events from the Events table that have not been deleted (i.e., where deletedAt is NULL).