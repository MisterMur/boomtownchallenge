import React, { useState, useEffect } from "react";
import { Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";
// import { BOOMTOWN_REPOS } from "../Data/boomtown_repos";
import "../Styles/Styles.scss";

function Repos(props) {
  const [repoData, setRepoData] = useState([]);

  //   const [repoData, setRepoData] = useState(BOOMTOWN_REPOS);
  const [apiError, setApiError] = useState("");
  const { reposUrl } = props;

  useEffect(() => {
    if (reposUrl) {
      try {
        fetch(reposUrl)
          .then((r) => r.json())
          .then((data) => {
            if (data.message) {
              setApiError(data.message);
            } else {
              setRepoData(data);
            }
          });
      } catch (e) {
        setApiError(e);
      }
    }
  }, [reposUrl]);

  function renderRepos() {
    return (
      repoData !== [] &&
      repoData?.map((repo, idx) => {
        return (
          <div className="card-container" key={idx}>
            <Card border="secondary" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  Repo {idx + 1}: {repo.name}
                </Card.Title>
                <Card.Text>Repo ID: {repo.id}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Language: {repo.language}</ListGroupItem>
                <ListGroupItem>
                  Created At: {repo.created_at.toLocaleString()}
                </ListGroupItem>
                <ListGroupItem>
                  Updated At: {repo.updated_at.toLocaleString()}
                </ListGroupItem>
                <ListGroupItem>
                  Pushed At: {repo.pushed_at.toLocaleString()}
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <p>Description: {repo.description}</p>
                <Card.Link href={repo.html_url}> {repo.html_url}</Card.Link>
              </Card.Body>
            </Card>
          </div>
        );
      })
    );
  }
  return (
    <div
      aria-labelledby="repo-title"
      id="repo-data"
      role="contentinfo"
      className="data-container"
      style={{ paddingTop: 70 }}
    >
      <h1 id="repo-title">Repo Data</h1>
      {repoData ? (
        <CardGroup className="card-group">{renderRepos()}</CardGroup>
      ) : (
        <p style={{ fontSize: 30, color: "red" }}>{apiError}</p>
      )}
    </div>
  );
}

export default Repos;
