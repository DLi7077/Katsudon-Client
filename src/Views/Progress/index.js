import React, { useEffect, useState } from "react";
import { map } from "lodash";
import UserAPI from "../../Api/UserAPI";
import { Avatar, CircularProgress } from "@mui/material";
import SolutionModal from "../../Components/SolutionModal";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import currentUser from "../../Utils/UserTools";
import postGenerator from "./postGenerator";
import RowGenerator from "./RowGenerator";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Activity(props) {
  const [weeklySolutions, setWeeklySolutions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // solution modal
  const [solutionDisplay, setSolutionDisplay] = useState(false);
  const [problemBlock, setProblemBlock] = useState({});
  const [solutionsBlock, setSolutionsBlock] = useState({});

  function handleOpenSolutionModel(problem, solutions) {
    setProblemBlock(problem);
    setSolutionsBlock(solutions);
    setSolutionDisplay(true);
  }

  function handleCloseSolutionModel() {
    setProblemBlock({});
    setSolutionsBlock({});
    setSolutionDisplay(false);
  }

  async function setPosts() {
    setLoading(true);
    await UserAPI.getWeeklySolutions(currentUser("auth_token"))
      .then((solutions) => {
        // clean solutions then group by date
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

  function Header() {
    return (
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
  }

  function Legend() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "1rem",
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

  function DateDivider({ date }) {
    const whiteBarStyle = {
      height: "2px",
      width: "100%",
      backgroundColor: props.text,
    };
    return (
      <span
        className="justify-center"
        style={{
          position: "sticky",
          top: 50,
          width: "min(90vw, 640px)",
          gap: "1rem",
          marginTop: "1rem",
          backgroundColor: props.backgroundColor,
          zIndex: 2,
        }}
      >
        <span style={whiteBarStyle} />
        <span
          style={{
            fontSize: "16px",
            whiteSpace: "nowrap",
            color: "white",
          }}
        >
          {date}
        </span>
        <span style={whiteBarStyle} />
      </span>
    );
  }

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <SolutionModal
        open={solutionDisplay}
        handleClose={handleCloseSolutionModel}
        problem={problemBlock}
        solutions={solutionsBlock}
      />
      <Header />
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
        <div
          className="align-down"
          style={{ alignItems: "center", gap: "2rem" }}
        >
          {map(weeklySolutions, (dailySolutions, date) => {
            return (
              <div
                className="align-down"
                style={{ gap: "1.5rem" }}
                key={`${date}-posts`}
              >
                <DateDivider key={date} date={date} />
                {dailySolutions.map((post, idx) => {
                  return (
                    <div
                      key={idx}
                      className="align-down progress-post container"
                      style={{ backgroundColor: props.section }}
                    >
                      <UserHeader
                        userId={post.user_id}
                        username={post.username}
                        profileURL={post.profile_picture_url}
                      />
                      {!!post.solved.length && (
                        <div
                          className="align-down"
                          style={{
                            justifyContent: "flex-start",
                            gap: ".25rem",
                          }}
                        >
                          <span style={{ fontSize: "1.25rem" }}>
                            Solved {post.solved.length} problem
                            {post.solved.length > 1 ? "s" : ""}
                          </span>
                          <RowGenerator
                            solutions={post.solved}
                            handleOpenSolutionModel={handleOpenSolutionModel}
                          />
                        </div>
                      )}

                      {!!post.attempted.length && (
                        <div
                          className="align-down"
                          style={{
                            justifyContent: "flex-start",
                            gap: ".25rem",
                          }}
                        >
                          <span
                            style={{ fontSize: "1.25rem", color: "#FFC185" }}
                          >
                            Attempted {post.attempted.length} problem
                            {post.solved.length > 1 ? "s" : ""}
                          </span>
                          <RowGenerator
                            solutions={post.attempted}
                            handleOpenSolutionModel={handleOpenSolutionModel}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
