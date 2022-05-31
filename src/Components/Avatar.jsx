import React from "react";

function Avatar(props) {
  function renderAvatar() {
    // https://avatars.githubusercontent.com/u/1214096?v=4
    return (
      <div className="avatar-wrapper">
        <img
          src={props.avatarUrl}
          alt={props.avatarUrl}
          style={{ borderRadius: "50%" }}
        ></img>
      </div>
    );
  }

  return (
    <div>
      <h1>Avatar</h1>
      {props.avatarUrl ? (
        renderAvatar()
      ) : (
        <h3 style={{ color: "red" }}>Avatar Not Found</h3>
      )}
    </div>
  );
}
export default Avatar;
