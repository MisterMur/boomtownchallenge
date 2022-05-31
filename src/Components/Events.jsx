import React, { useEffect, useState } from "react";
import { Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";
// import { BOOMTOWN_EVENTS } from "../Data/boomtown_events";
import "../Styles/Styles.scss";

function Events(props) {
  const [eventsData, setEventsData] = useState([]);
  // const [eventsData, setEventsData] = useState(BOOMTOWN_EVENTS);
  const [apiError, setApiError] = useState("");
  const { eventsUrl } = props;
  useEffect(() => {
    if (eventsUrl) {
      try {
        fetch(eventsUrl)
          .then((r) => r.json())
          .then((data) => {
            if (data.message) {
              setApiError(data.message);
            } else {
              setEventsData(data);
            }
          });
      } catch (e) {
        setApiError(e);
      }
    }
  }, [eventsUrl]);

  function renderEvents() {
    return (
      eventsData !== [] &&
      eventsData.map((event, idx) => {
        return (
          <div
            role="region"
            aria-labelledby={"event-title-" + idx}
            className="card-container"
            id={"event-" + idx}
            key={idx}
          >
            <Card border="secondary" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title id={"event-title-" + idx}>
                  Event {idx + 1}:
                </Card.Title>
                <Card.Text>Event ID: {event.id}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Created At: {event.created_at.toLocaleString()}
                </ListGroupItem>
                <ListGroupItem>Repo Name: {event.repo.name}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <p>Repo URL:</p>

                <Card.Link href={event.repo.url}>{event.repo.url}</Card.Link>
              </Card.Body>
            </Card>
          </div>
        );
      })
    );
  }
  return (
    <div
      id="event-data"
      aria-labelledby="events-title"
      className="data-container"
      role="contentinfo"
      style={{ paddingTop: 70 }}
    >
      <h1 id="events-title">Event Data</h1>
      {eventsData ? (
        <CardGroup className="card-group">{renderEvents()}</CardGroup>
      ) : (
        <p style={{ fontSize: 30, color: "red" }}>{apiError}</p>
      )}
    </div>
  );
}
export default Events;
