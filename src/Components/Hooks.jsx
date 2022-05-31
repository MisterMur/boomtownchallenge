import React, { useEffect, useState } from "react";
// import { BOOMTOWN_HOOKS } from "../Data/Boomtown_hooks";
import "../Styles/Styles.scss";

function Hooks(props) {
  const [hooksData, setHooksData] = useState({});
  //   const [hooksData, setHooksData] = useState(BOOMTOWN_HOOKS);
  const [apiError, setApiError] = useState("");
  const { hooksUrl } = props;
  useEffect(() => {
    if (hooksUrl) {
      try {
        fetch(hooksUrl)
          .then((r) => r.json())
          .then((data) => {
            if (data.message) {
              setApiError(data.message);
            } else {
              setHooksData(data);
            }
          });
      } catch (e) {
        setApiError(e);
      }
    }
  }, [hooksUrl]);
  function renderHooks() {
    return apiError && apiError ? (
      <>
        <h3 style={{ color: "red" }}>{apiError}</h3>
      </>
    ) : (
      <>
        {/* handle data if hooksdata is precences here */}
        <p>{hooksData.toString()}</p>
      </>
    );
  }
  return (
    <div
      id="hooks-data"
      aria-labelledby="hooks-title"
      style={{ paddingTop: 70 }}
      role="contentinfo"
    >
      <h1 id="hooks-title">Hooks Data</h1>
      {renderHooks()}
    </div>
  );
}
export default Hooks;
