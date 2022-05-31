import React, { useState, useEffect } from "react";
import boomError from "./BoomError.jpeg";
// import { BOOMTOWN_DATA } from "./Data/boomtown";

import Events from "./Components/Events";
import Hooks from "./Components/Hooks";
import Issues from "./Components/Issues";
import Members from "./Components/Members";
import PublicMembers from "./Components/PublicMembers";
import Repos from "./Components/Repos";
import Avatar from "./Components/Avatar";
import "./Styles/Styles.scss";

const API_URL = "https://api.github.com/orgs/boomtownroi";

function BoomtownScreen() {
  const [apiUrl] = useState(API_URL);

  // Use this when requesting data from API
  const [apiData, setApiData] = useState({});

  //   Use these as init state instead of sending requests to API
  // const [apiData, setApiData] = useState(BOOMTOWN_DATA);
  const [apiError, setApiError] = useState("");

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
      <div
        role="region"
        aria-labelledby="organization-results-title"
        id="organization-results"
        className="data-container"
        style={{ paddingTop: 70 }}
      >
        <h1 id="organization-results-title">ORGANIZATION API RESULTS</h1>
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
      </div>
    );
  }
  function renderScreen() {
    return (
      <>
        {apiData !== {} ? (
          <>
            {renderOrganizationData()}
            <Repos reposUrl={repos_url} />
            <Events eventsUrl={events_url} />
            <Hooks hooksUrl={hooks_url} />
            <Issues issuesUrl={issues_url} />
            <Members membersUrl={membersUrl} />
            <PublicMembers publicMembersUrl={publicMembersUrl} />
            <Avatar avatarUrl={avatar_url} />
          </>
        ) : (
          ""
        )}
      </>
    );
  }
  function renderApiError() {
    return (
      <div role="contentinfo" style={{ paddingTop: 50 }}>
        <main>
          <img alt="BOOMERROR" aria-label="boomerror" src={boomError} />
          <p style={{ fontSize: 30, color: "red" }}>{apiError}</p>
        </main>
      </div>
    );
  }

  return <>{apiError ? renderApiError() : renderScreen()}</>;
}

export default BoomtownScreen;
