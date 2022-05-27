import React, { useState, useEffect } from "react";

function Api() {
  const [apiUrl, setApiUrl] = useState(
    "https://api.github.com/orgs/boomtownroi"
  );
  const [apiData, setApiData] = useState({});
  const [repoData, setRepoData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [hooksData, setHooksData] = useState({});
  const [issuesData, setIssuesData] = useState({});
  const [membersData, setMembersData] = useState({});
  const [avatarData, setAvatarData] = useState({});

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) =>
        res.status === 200 ? res.json() : new Error("request failed")
      )
      .then((data) => {
        console.log("api data", data);
        setApiData(data);
      });
  }, [apiUrl]);

  const {
    repos_url,
    events_url,
    hooks_url,
    issues_url,
    members_url,
    avatar_url,
  } = apiData;
  useFetch(repos_url).then((d) => setRepoData(d));
  useFetch(events_url).then((d) => setEventsData(d));
  useFetch(hooks_url).then((d) => setHooksData(d));
  useFetch(issues_url).then((d) => setIssuesData(d));
  useFetch(members_url).then((d) => setMembersData(d));
  useFetch(avatar_url).then((d) => setAvatarData(d));

  console.log("repoData", repoData);
  console.log("eventsData", eventsData);
  console.log("hooksdata", hooksData);
  console.log("issuesdata", issuesData);
  console.log("membersdata", membersData);
  console.log("avatardata", avatarData);

  function renderEventsData() {
    return (
      eventsData &&
      eventsData.map((event, idx) => {
        return (
          <div key={event.id}>
            <h2>Event {idx + 1}</h2>
            <p>***************</p>
            <p>Event id:{event.id}</p>
            <p>Event Name:{event.name}</p>
            <p>Repo.name:{event.repo.name}</p>
            <p>Repo.url:{event.repo.url}</p>
            <p>created_at: {event.created_at}</p>
          </div>
        );
      })
    );
  }

  function renderRepoData() {
    console.log("render repo data ", repoData);
    if (repoData?.length > 0) {
      repoData.map((repo, idx) => {
        return (
          <div key={repo.id}>
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
      });
    }
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
      {/* {renderEventsData()} */}
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
