import React, { useEffect, useState } from "react";
import { Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";

// import { BOOMTOWN_MEMBERS } from "../Data/boomtown_members";
import "../Styles/Styles.scss";

function Members(props) {
  const [membersData, setMembersData] = useState([]);

  // const [membersData, setMembersData] = useState(BOOMTOWN_MEMBERS);
  const [apiError, setApiError] = useState("");
  const { membersUrl } = props;
  useEffect(() => {
    if (membersUrl) {
      try {
        fetch(membersUrl)
          .then((r) => r.json())
          .then((data) => {
            if (data.message) {
              setApiError(data.message);
            } else {
              setMembersData(data);
            }
          });
      } catch (e) {
        setApiError(e);
      }
    }
  }, [membersUrl]);

  function renderMembers() {
    return (
      membersData !== [] &&
      membersData.map((member, idx) => {
        return (
          <div className="card-container" key={idx}>
            <Card border="secondary" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                alt="member avatar"
                src={member.avatar_url}
                style={{ borderRadius: "50%" }}
              />
              <Card.Body>
                <Card.Title>
                  Member {idx + 1}: {member.login}
                </Card.Title>
                <Card.Text>Member ID: {member.id}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Type: {member.type}</ListGroupItem>
                <ListGroupItem>
                  Site Admin: {member.site_admin.toString().toUpperCase()}
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href={member.html_url}> {member.html_url}</Card.Link>
              </Card.Body>
            </Card>
          </div>
        );
      })
    );
  }
  return (
    <div
      id="members-data"
      className="data-container"
      aria-labelledby="members-title"
      role="contentinfo"
      style={{ paddingTop: 70 }}
    >
      <h1 id="members-title">Members </h1>
      {membersData ? (
        <CardGroup className="card-group">{renderMembers()}</CardGroup>
      ) : (
        <p style={{ fontSize: 30, color: "red" }}>{apiError}</p>
      )}
    </div>
  );
}
export default Members;
