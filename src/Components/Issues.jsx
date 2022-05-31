import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";

// import { BOOMTOWN_ISSUES } from "../Data/Boomtown_issues";
import "../Styles/Styles.scss";

function Issues(props) {
  const [issuesData, setIssuesData] = useState({});
  //   const [issuesData, setIssuesData] = useState(BOOMTOWN_ISSUES);
  const [apiError, setApiError] = useState("");
  const { issuesUrl } = props;

  useEffect(() => {
    if (issuesUrl) {
      try {
        fetch(issuesUrl)
          .then((r) => r.json())
          .then((data) => {
            if (data.message) {
              setApiError(data.message);
            } else {
              setIssuesData(data);
            }
          });
      } catch (e) {
        setApiError(e);
      }
    }
  }, [issuesUrl]);
  function renderIssues() {
    return apiError && apiError ? (
      <>
        <h3 style={{ color: "red" }}>{apiError}</h3>
      </>
    ) : (
      <>
        {/* handle data if issuesData is precences here */}
        <p>{issuesData.toString()}</p>
      </>
    );
  }
  return (
    <div
      id="issues-data"
      className="data-container"
      aria-labelledby="issues-title"
      style={{ paddingTop: 70 }}
      role="contentinfo"
    >
      <h1 id="issues-title">Issues Data</h1>
      <CardGroup className="card-group">{renderIssues()}</CardGroup>
    </div>
  );
}
export default Issues;
