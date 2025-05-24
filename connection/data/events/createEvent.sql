-- File:connection/data/events/createEvent.sql

INSERT INTO Events (
    eventTitle,
    eventDescription,
    startDate,
    endDate,
    avenue,
    maxMembers,
    createdAt,
    updatedAt
)
VALUES (
    @eventTitle,
    @eventDescription,
    @startDate,
    @endDate,
    @avenue,
    @maxMembers,
    GETDATE(),
    GETDATE()
);

SELECT SCOPE_IDENTITY() AS insertedId;

-- This query inserts a new event into the Events table with the provided details and returns the ID of the newly created event.