import React, { useState, useEffect } from "react";
import { Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import boomError from "./BoomError.jpeg";
// import { BOOMTOWN_DATA } from "./Data/boomtown";
// import { BOOMTOWN_REPOS } from "./Data/boomtown_repos";
// import { BOOMTOWN_PUBLIC_MEMBERS } from "./Data/boomtown_public_members";
// import { BOOMTOWN_AVATAR } from "./Data/Boomtown_avatar";
// import { BOOMTOWN_EVENTS } from "./Data/boomtown_events";
// import { BOOMTOWN_MEMBERS } from "./Data/boomtown_members";
// import { BOOMTOWN_ISSUES } from "./Data/Boomtown_issues";
// import { BOOMTOWN_HOOKS } from "./Data/Boomtown_hooks";
import "./Styles/API.scss";
const API_URL = "https://api.github.com/orgs/boomtownroi";

function Api() {
  // Use these when requesting data from API
  const [apiUrl] = useState(API_URL);
  const [apiData, setApiData] = useState({});
  const [repoData, setRepoData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [hooksData, setHooksData] = useState({});
  const [issuesData, setIssuesData] = useState({});
  const [membersData, setMembersData] = useState([]);
  const [publicMembersData, setPublicMembersData] = useState([]);
  const [apiError, setApiError] = useState("");

  // Use these as init state instead of sending requests to API
  //   const [apiUrl, setApiUrl] = useState(API_URL);
  //   const [apiData, setApiData] = useState(BOOMTOWN_DATA);
  //   const [repoData, setRepoData] = useState(BOOMTOWN_REPOS);
  //   const [eventsData, setEventsData] = useState(BOOMTOWN_EVENTS);
  //   const [hooksData, setHooksData] = useState(BOOMTOWN_HOOKS);
  //   const [issuesData, setIssuesData] = useState(BOOMTOWN_ISSUES);
  //   const [membersData, setMembersData] = useState(BOOMTOWN_MEMBERS);
  //   const [publicMembersData, setPublicMembersData] = useState(
  //     BOOMTOWN_PUBLIC_MEMBERS
  //   );
  //   const [error, setError] = useState();
  //   const [apiError, setApiError] = useState("");

  useEffect(() => {
    try {
      fetch(apiUrl)
        .then((r) => r.json())
        .then((data) => {
          if (data.message) {
            setApiError(data.message);
          } else {
            setApiData(data);
          }
        });
    } catch (e) {
      setApiError(e);
    }
  }, [apiUrl]);

  const {
    repos_url,
    events_url,
    hooks_url,
    issues_url,
    members_url,
    public_members_url,
    avatar_url,
  } = apiData;
  let membersUrl = members_url?.replace("{/member}", "");
  let publicMembersUrl = public_members_url?.replace("{/member}", "");

  useFetch(repos_url).then((d) => {
    if (Object.keys(d).length !== 0) {
      setRepoData(d);
    }
  });
  useFetch(events_url).then((d) => {
    if (Object.keys(d).length !== 0) {
      setEventsData(d);
    }
  });
  useFetch(hooks_url).then((d) => {
    if (Object.keys(d).length !== 0) {
      setHooksData(d);
    }
  });
  useFetch(issues_url).then((d) => {
    if (Object.keys(d).length !== 0) {
      setIssuesData(d);
    }
  });
  useFetch(membersUrl).then((d) => {
    if (Object.keys(d).length !== 0) {
      setMembersData(d);
    }
  });
  useFetch(publicMembersUrl).then((d) => {
    if (Object.keys(d).length !== 0) {
      setPublicMembersData(d);
    }
  });
  //   useFetch(avatar_url).then((d) => {
  //     if (Object.keys(d).length !== 0) {
  //       setAvatarData(d);
  //     }
  //   });

  //   console.log("repoData", repoData);
  //   console.log("eventsData", eventsData);
  //   console.log("hooksdata", hooksData);
  //   console.log("issuesdata", issuesData);
  //   console.log("membersdata", membersData);
  //   console.log("membersdata", publicMembersData);
  //   console.log("avatardata", avatarData);

  function renderEventsData() {
    return (
      eventsData !== [] &&
      eventsData.map((event, idx) => {
        return (
          <div className="card-container" key={idx}>
            <Card border="secondary" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Event {idx + 1}:</Card.Title>
                <Card.Text>Event ID: {event.id}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Created At: {event.created_at}</ListGroupItem>
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
  function renderAvatar(img_url) {
    // https://avatars.githubusercontent.com/u/1214096?v=4
    return (
      <div className="avatar-wrapper">
        <img src={img_url} alt={img_url} style={{ borderRadius: "50%" }}></img>
      </div>
    );
  }

  function renderRepoData() {
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
                <ListGroupItem>Created At: {repo.created_at}</ListGroupItem>
                <ListGroupItem>Updated At: {repo.updated_at}</ListGroupItem>
                <ListGroupItem>Pushed At: {repo.pushed_at}</ListGroupItem>
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
  function renderHooksData() {
    return hooksData && hooksData.message ? (
      <>
        <h3 style={{ color: "red" }}>{hooksData.message}</h3>
      </>
    ) : (
      <>{/* handle data if hooksdata is precences here */}</>
    );
  }
  function renderIssuesData() {
    return issuesData && issuesData.message ? (
      <>
        <h3 style={{ color: "red" }}>{issuesData.message}</h3>
      </>
    ) : (
      <>{/* handle data if issuesdata is precences here */}</>
    );
  }
  function renderMembersData() {
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
  function renderPublicMembersData() {
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
  function renderOrganizationData() {
    let createdBefore = false;
    if (Date.parse(apiData.created_at) < Date.parse(apiData.updated_at)) {
      //created_at is before updated_at
      createdBefore = true;
    } else if (
      Date.parse(apiData.created_at) > Date.parse(apiData.updated_at)
    ) {
      //created_at is after than updated_at
      createdBefore = false;
    } else {
      //created and updated same time
    }

    return (
      <>
        <p>ID: {apiData?.id}</p>
        <p>Name: {apiData?.name}</p>
        <p>
          URL:{" "}
          <a id="api-url" href={apiData?.html_url}>
            {apiData?.html_url}
          </a>
        </p>
        <p>Verified: {apiData?.is_verified?.toString().toUpperCase()}</p>
        <p
          style={
            createdBefore
              ? { color: "red", fontSize: 24 }
              : { color: "green", fontSize: 24 }
          }
        >
          {createdBefore ? "(Older) " : "(More Recent) "}
          Created At: {apiData?.created_at}{" "}
        </p>
        <p
          style={
            createdBefore
              ? { color: "green", fontSize: 24 }
              : { color: "red", fontSize: 24 }
          }
        >
          {createdBefore ? "(More Recent) " : "(Older) "}
          Updated At: {apiData?.updated_at}{" "}
        </p>
      </>
    );
  }
  function renderScreen() {
    return (
      <>
        <div
          id="organization-data"
          className="data-container"
          style={{ paddingTop: 70 }}
        >
          <main>
            <h1>API RESULTS</h1>
          </main>
          {renderOrganizationData()}
        </div>
        <div
          id="repo-data"
          className="data-container"
          style={{ paddingTop: 70 }}
        >
          <h1>Repo Data</h1>

          <CardGroup className="card-group">{renderRepoData()}</CardGroup>
        </div>

        <div
          id="event-data"
          className="data-container"
          style={{ paddingTop: 70 }}
        >
          <h1>Event Data</h1>
          <CardGroup className="card-group">{renderEventsData()}</CardGroup>
        </div>

        <div id="hooks-data" style={{ paddingTop: 70 }}>
          <h1>Hooks Data</h1>
          {renderHooksData()}
        </div>
        <div
          id="issues-data"
          className="data-container"
          style={{ paddingTop: 70 }}
        >
          <h1>Issues Data</h1>
          <CardGroup className="card-group">{renderIssuesData()}</CardGroup>
        </div>

        <div
          id="members-data"
          className="data-container"
          style={{ paddingTop: 70 }}
        >
          <h1>Members</h1>
          <CardGroup className="card-group">{renderMembersData()}</CardGroup>
        </div>

        <div
          id="public-members-data"
          className="data-container"
          style={{ paddingTop: 70 }}
        >
          <h2>Public Members</h2>
          <CardGroup className="card-group">
            {renderPublicMembersData()}
          </CardGroup>
        </div>

        <h1>Avatar</h1>
        {renderAvatar(avatar_url)}
      </>
    );
  }
  function renderApiError() {
    return (
      <div role="contentinfo" style={{ paddingTop: 50 }}>
        <img alt="BOOMERROR" src={boomError} />

        <p style={{ fontSize: 30, color: "red" }}>{apiError}</p>
      </div>
    );
  }

  return <>{apiError ? renderApiError() : renderScreen()}</>;
}

const useFetch = async (url) => {
  const [apiData, setApiData] = useState({});
  //   const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(url)
          .then((r) => r.json())
          .then((data) => setApiData(data));
      } catch (e) {
        setApiData(e);
        // setError(e);
      }
    }

    fetchData();
  }, [url]);

  return apiData;
};
export default Api;
