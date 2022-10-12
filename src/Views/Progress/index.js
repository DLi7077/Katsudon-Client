import React, { useEffect, useState } from "react";
import { get } from "lodash";
import UserAPI from "../../Api/UserAPI";
import { PROBLEM_DIFFICULTY } from "../../Constants/colors";
import { Avatar, CircularProgress } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import currentUser from "../../Utils/UserTools";
import postGenerator from "./postGenerator";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Activity(props) {
  const [weeklySolutions, setWeeklySolutions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function setPosts() {
    setLoading(true);
    await UserAPI.getWeeklySolutions(currentUser("auth_token"))
      .then((solutions) => {
        setWeeklySolutions(postGenerator(solutions.rows));
      })
      .catch(console.error)
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  }

  useEffect(() => {
    setPosts();
  }, []);

  const header = (
    <div
      className="align-down"
      style={{
        textAlign: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "1.5rem",
        color: props.text,
        gap: "0.5rem",
      }}
    >
      <span style={{ fontSize: "2.5rem" }}>Weekly Progress</span>
      <span
        style={{
          fontSize: "1.25rem",
          color: props.color,
        }}
      >
        <PersonAddAlt1Icon
          style={{
            fontSize: "1.5rem",
            color: "#7AFF87",
            marginRight: ".25rem",
            verticalAlign: "-0.25rem",
          }}
        />
        Follow others to see how they're progressing this week, and try out
        problems they've solved!
      </span>
      <div
        style={{
          backgroundColor: props.color,
          marginTop: "1rem",
          height: "2px",
          width: "90%",
        }}
      />
    </div>
  );
  function Legend() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <TaskAltIcon style={{ fontSize: "1.5rem" }} />
          Solved
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <PanoramaFishEyeIcon
            style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.3)" }}
          />
          Not Solved
        </div>
      </div>
    );
  }

  const solvedStatusIcon = (completed) => {
    const iconStyle = {
      fontSize: "1.5rem",
      marginRight: "0.25rem",
    };
    return completed ? (
      <TaskAltIcon style={{ ...iconStyle }} />
    ) : (
      <PanoramaFishEyeIcon
        style={{ ...iconStyle, color: "rgba(255,255,255,0.3)" }}
      />
    );
  };

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

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      {header}
      <Legend />
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <CircularProgress
            style={{
              color: props.color,
              width: "4rem",
              height: "4rem",
            }}
          />
        </div>
      )}
      {!isLoading && (
        <>
          <div
            className="align-down"
            style={{ alignItems: "center", gap: "3rem" }}
          >
            {weeklySolutions.map((post, idx) => {
              return (
                <div
                  key={idx}
                  className="align-down progress-post container"
                  style={{ backgroundColor: props.section }}
                >
                  {/* <Link
                    className="user-wrapper hover-link"
                    style={{ color: "white" }}
                    to={`/profile?user_id=${post.user_id}`}
                  >
                    <Avatar
                      src={post.profile_picture_url ?? null}
                      style={{ height: "2.5rem", width: "2.5rem" }}
                    />
                    <span className="hover-link">{post.username}</span>
                  </Link> */}
                  <UserHeader
                    userId={post.user_id}
                    username={post.username}
                    profileURL={post.profile_picture_url}
                    date={post.date}
                  />
                  <div
                    className="align-down"
                    style={{ justifyContent: "flex-start", gap: ".25rem" }}
                  >
                    {post.solved.length && (
                      <>
                        <span style={{ fontSize: "1.25rem" }}>
                          Solved {post.solved.length} problem
                          {post.solved.length > 1 ? "s" : ""}
                        </span>
                        {post.solved.map((solution, idx) => {
                          return (
                            <div className="problem-item" key={idx}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {solvedStatusIcon(
                                  get(solution, "problem.solved_by").includes(
                                    currentUser("user-id")
                                  )
                                )}
                                <a
                                  href={solution.problem.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover-link"
                                  style={{
                                    color:
                                      PROBLEM_DIFFICULTY[
                                        solution.problem.difficulty
                                      ],
                                  }}
                                >
                                  {solution.problem.title}
                                </a>
                              </div>
                              {solution.solution_language}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>

                  {!!post.attempted.length && (
                    <div
                      className="align-down"
                      style={{ justifyContent: "flex-start", gap: ".25rem" }}
                    >
                      <span style={{ fontSize: "1.25rem" }}>
                        Attempted {post.attempted.length} problem
                        {post.attempted.length > 1 ? "s" : ""}
                      </span>
                      {post.attempted.map((solution, idx) => {
                        return (
                          <div className="problem-item" key={idx}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {solvedStatusIcon(
                                get(solution, "problem.solved_by").includes(
                                  currentUser("user-id")
                                )
                              )}
                              <a
                                href={solution.problem.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover-link"
                                style={{
                                  color:
                                    PROBLEM_DIFFICULTY[
                                      solution.problem.difficulty
                                    ],
                                }}
                              >
                                {solution.problem.title}
                              </a>
                            </div>
                            {solution.solution_language}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
