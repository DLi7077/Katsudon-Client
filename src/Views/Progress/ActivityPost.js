import ProblemRow from "./ProblemRows";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function UserHeader({ userId, username, profileURL, date }) {
  return (
    <span style={{ display: "flex", justifyContent: "space-between" }}>
      <Link
        className="user-wrapper hover-link"
        style={{ color: "white" }}
        to={`/profile?user_id=${userId}`}
      >
        <Avatar
          src={profileURL ?? null}
          style={{ height: "2.5rem", width: "2.5rem" }}
        />
        <span className="hover-link">{username}</span>
      </Link>
      <span style={{ fontSize: "1.25rem" }}>{date}</span>
    </span>
  );
}

export default function ActivityPost(props) {
  return (
    <div
      className="align-down progress-post container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <UserHeader
        userId={props.userId}
        username={props.username}
        profileURL={props.profileURL}
      />

      {!!props.solved.length && (
        <div
          className="align-down"
          style={{ justifyContent: "flex-start", gap: ".25rem" }}
        >
          <span style={{ fontSize: "1.25rem" }}>
            Solved {props.solved.length} problem
            {props.solved.length > 1 ? "s" : ""}
          </span>
          <ProblemRow
            solutions={props.solved}
            handleOpenSolutionModel={props.handleOpenSolutionModel}
          />
        </div>
      )}

      {!!props.attempted.length && (
        <div
          className="align-down"
          style={{ justifyContent: "flex-start", gap: ".25rem" }}
        >
          <span style={{ fontSize: "1.25rem", color: "#FFC185" }}>
            Attempted {props.attempted.length} problem
            {props.solved.length > 1 ? "s" : ""}
          </span>
          <ProblemRow
            solutions={props.attempted}
            handleOpenSolutionModel={props.handleOpenSolutionModel}
          />
        </div>
      )}
    </div>
  );
}
