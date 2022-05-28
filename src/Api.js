import React, { useState, useEffect } from "react";
import { Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { BOOMTOWN_DATA } from "./Data/boomtown";
import { BOOMTOWN_REPOS } from "./Data/boomtown_repos";
import { BOOMTOWN_PUBLIC_MEMBERS } from "./Data/boomtown_public_members";
import { BOOMTOWN_AVATAR } from "./Data/Boomtown_avatar";
import { BOOMTOWN_EVENTS } from "./Data/boomtown_events";
import { BOOMTOWN_MEMBERS } from "./Data/boomtown_members";
import { BOOMTOWN_ISSUES } from "./Data/Boomtown_issues";
import { BOOMTOWN_HOOKS } from "./Data/Boomtown_hooks";
import "./Styles/API.scss";
const API_URL = "https://api.github.com/orgs/boomtownroi";

function Api() {
  // Use these when requesting data from API
  //   const [apiUrl, setApiUrl] = useState(API_URL);
  //   const [apiData, setApiData] = useState({});
  //   const [repoData, setRepoData] = useState([]);
  //   const [eventsData, setEventsData] = useState([]);
  //   const [hooksData, setHooksData] = useState({});
  //   const [issuesData, setIssuesData] = useState({});
  //   const [membersData, setMembersData] = useState({});
  //   const [publicMembersData, setPublicMembersData] = useState({});
  //   const [avatarData, setAvatarData] = useState({});

  // Use these as init state instead of sending requests to API
  const [apiUrl, setApiUrl] = useState(API_URL);
  const [apiData, setApiData] = useState(BOOMTOWN_DATA);
  const [repoData, setRepoData] = useState(BOOMTOWN_REPOS);
  const [eventsData, setEventsData] = useState(BOOMTOWN_EVENTS);
  const [hooksData, setHooksData] = useState(BOOMTOWN_HOOKS);
  const [issuesData, setIssuesData] = useState(BOOMTOWN_ISSUES);
  const [membersData, setMembersData] = useState(BOOMTOWN_MEMBERS);
  const [publicMembersData, setPublicMembersData] = useState(
    BOOMTOWN_PUBLIC_MEMBERS
  );
  const [avatarData, setAvatarData] = useState(BOOMTOWN_AVATAR);

  //   useEffect(() => {
  //     fetch(apiUrl, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then((res) =>
  //         res.status === 200 ? res.json() : new Error("request failed")
  //       )
  //       .then((data) => {
  //         console.log("api data", data);
  //         setApiData(data);
  //       });
  //   }, [apiUrl]);

  const {
    repos_url,
    events_url,
    hooks_url,
    issues_url,
    members_url,
    public_members_url,
    avatar_url,
  } = apiData;
  //   useFetch(repos_url).then((d) => setRepoData(d));
  //   useFetch(events_url).then((d) => setEventsData(d));
  //   useFetch(hooks_url).then((d) => setHooksData(d));
  //   useFetch(issues_url).then((d) => setIssuesData(d));
  //   useFetch(members_url).then((d) => setMembersData(d));
  //   useFetch(avatar_url).then((d) => setAvatarData(d));

  console.log("repoData", repoData);
  console.log("eventsData", eventsData);
  console.log("hooksdata", hooksData);
  console.log("issuesdata", issuesData);
  console.log("membersdata", membersData);
  console.log("membersdata", publicMembersData);
  console.log("avatardata", avatarData);

  function renderEventsData() {
    return (
      eventsData &&
      eventsData.map((event, idx) => {
        return (
          <div key={idx}>
            <h2>Event {idx + 1}</h2>
            <p>***************</p>
            <p>Event ID: {event.id}</p>
            <p>Repo Name: {event.repo.name}</p>
            <p>Repo Url: {event.repo.url}</p>
            <p>created_at: {event.created_at}</p>
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
      repoData &&
      repoData.map((repo, idx) => {
        return (
          <div key={idx}>
            <h2>Repo {idx + 1}</h2>
            <p>***************</p>

            <p>Repo id:{repo.id}</p>
            <p>Repo Name: {repo.name}</p>
            <p>Html_url: {repo.html_url}</p>
            <p>description: {repo.description}</p>
            <p>language: {repo.language}</p>
            <p>created_at:{repo.created_at}</p>
            <p>updated_at:{repo.updated_at}</p>
            <p>pushed_at:{repo.pushed_at}</p>
          </div>
        );
      })
    );
  }
  function renderHooksData() {
    return <></>;
  }
  function renderIssuesData() {
    return <></>;
  }
  function renderMembersData() {
    return (
      membersData &&
      membersData.map((member, idx) => {
        return (
          <div key={idx}>
            <Card border="secondary" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
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
                <ListGroupItem>Site_admin: {member.site_admin}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#"> {member.html_url}</Card.Link>
              </Card.Body>
            </Card>
          </div>
        );
      })
    );
  }
  function renderPublicMembersData() {
    return (
      publicMembersData &&
      publicMembersData.map((member, idx) => {
        return (
          <div key={idx}>
            <Card border="secondary" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
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
                <ListGroupItem>Site_admin: {member.site_admin}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#"> {member.html_url}</Card.Link>
              </Card.Body>
            </Card>
          </div>
        );
      })
    );
  }

  return (
    <>
      <h1>API RESULTS</h1>
      <p>ID: {apiData.id}</p>
      <p>Name: {apiData.name}</p>
      <p>html_url: {apiData.html_url}</p>
      <p>is_verified: {apiData.is_verified}</p>
      <p>created_at: {apiData.created_at}</p>
      <p>updated_at: {apiData.updated_at}</p>
      <h1>REPO RESULTS</h1>
      {renderRepoData()}

      <h1>Event RESULTS</h1>
      {renderEventsData()}

      <h1>Hooks Data</h1>
      {renderHooksData()}

      <h1>Issues Data</h1>
      {renderIssuesData()}

      <h1>Members</h1>
      <CardGroup className="card-group">{renderMembersData()}</CardGroup>

      <h2>Public Members</h2>
      <CardGroup className="card-group">{renderPublicMembersData()}</CardGroup>

      <h1>Avatar</h1>
      {renderAvatar(avatar_url)}
    </>
  );
}

const useFetch = async (url) => {
  const [apiData, setApiData] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url)
          .then((r) => r.json())
          .then((data) => setApiData(data));
      } catch (e) {
        setError(e);
      }
    }

    fetchData();
  }, [url]);

  return apiData;
};
export default Api;
