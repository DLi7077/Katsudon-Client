import React from "react";
import { get } from "lodash";
import { IconButton } from "@mui/material";
import { PROBLEM_DIFFICULTY } from "../../Constants/colors";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { useSelector } from "react-redux";
import CodeLength from "../../Components/Codeblock/CodeLength";

const classes = {
  fileOpen: { fontSize: "1.5rem", color: "white", padding: 0 },
  languageLogo: { height: "2rem" },
  crossOut: {
    position: "absolute",
    width: "2rem",
    height: "2px",
    backgroundColor: "#FFAA00",
    top: "45%",
    left: "50%",
    translate: "-50% -50%",
    rotate: "-45deg",
  },
  solutionFileSpan: {
    display: "flex",
    whiteSpace: "nowrap",
    alignItems: "center",
    gap: "0.25rem",
  },
};

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

export default function ProblemRows(props) {
  const currentUser = useSelector((state) => state.user);

  return props.solutions.map((solution, idx) => {
    return (
      <div className="problem-item" key={idx}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {solvedStatusIcon(
            get(solution, "problem.solved_by").includes(currentUser.user_id)
          )}
          <a
            href={solution.problem.url}
            target="_blank"
            rel="noreferrer"
            className="hover-link"
            style={{
              color: PROBLEM_DIFFICULTY[solution.problem.difficulty],
            }}
          >
            {solution.problem.id}
            {". "}
            {solution.problem.title}
          </a>
        </div>
        <span style={classes.solutionFileSpan}>
          {solution.solution_language}
          <IconButton
            style={{ padding: 0 }}
            onClick={() => {
              props.handleOpenSolutionModel(get(solution, "problem"), {
                [solution.solution_language]: solution,
              });
            }}
          >
            <div style={{ position: "relative", height: "1.5rem" }}>
              <FileOpenIcon style={classes.fileOpen} />
              {!!get(solution, "failed") && <div style={classes.crossOut} />}
            </div>
          </IconButton>
          <CodeLength length={solution.solution_length} />
        </span>
      </div>
    );
  });
}
