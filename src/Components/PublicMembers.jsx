import React, { useEffect, useState } from "react";
import { Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";

// import { BOOMTOWN_PUBLIC_MEMBERS } from "../Data/boomtown_public_members";
import "../Styles/Styles.scss";

function PublicMembers(props) {
  const [publicMembersData, setPublicMembersData] = useState([]);

  //   const [publicMembersData, setPublicMembersData] = useState(
  //     BOOMTOWN_PUBLIC_MEMBERS
  //   );
  const [apiError, setApiError] = useState("");
  const { publicMembersUrl } = props;

  useEffect(() => {
    if (publicMembersUrl) {
      try {
        fetch(publicMembersUrl)
          .then((r) => r.json())
          .then((data) => {
            if (data.message) {
              setApiError(data.message);
            } else {
              setPublicMembersData(data);
            }
          });
      } catch (e) {
        setApiError(e);
      }
    }
  }, [publicMembersUrl]);
  function renderPublicMembers() {
    return (
      publicMembersData !== [] &&
      publicMembersData.map((member, idx) => {
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
      id="public-members-data"
      className="data-container"
      aria-labelledby="public-members-title"
      role="contentinfo"
      style={{ paddingTop: 70 }}
    >
      <h2 id="public-members-title">Public Members</h2>
      {publicMembersData ? (
        <CardGroup className="card-group">{renderPublicMembers()}</CardGroup>
      ) : (
        <p style={{ fontSize: 30, color: "red" }}>{apiError}</p>
      )}
    </div>
  );
}
export default PublicMembers;
