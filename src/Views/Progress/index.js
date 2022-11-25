import React, { useEffect, useState } from "react";
import { map } from "lodash";
import UserAPI from "../../Api/UserAPI";
import { postGenerator } from "./util";
import "./styles.css";
import Header from "./Header";
import { CircularProgress } from "@mui/material";
import SolutionModal from "../../Components/SolutionModal";
import ActivityPost from "./ActivityPost";

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
    await UserAPI.getWeeklySolutions()
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
      <Header text={props.text} color={props.color} />
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
            style={{ color: props.color, width: "4rem", height: "4rem" }}
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
                    <ActivityPost
                      key={idx}
                      userId={post.user_id}
                      username={post.username}
                      profileURL={post.profile_picture_url}
                      solved={post.solved}
                      attempted={post.attempted}
                      handleOpenSolutionModel={handleOpenSolutionModel}
                      backgroundColor={props.section}
                    />
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
