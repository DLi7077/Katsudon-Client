import React from "react";
import difficultyDistribution from "../../Utils/difficultyDistribution";
import { PROBLEM_DIFFICULTY } from "../../Constants/colors";

const classes = {
  solvedWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
};

// https://stackoverflow.com/a/42234957
export default function SolutionDistribution({ solvedProblems }) {
  const { Easy, Medium, Hard } = difficultyDistribution(solvedProblems);
  const totalSolved = Easy + Medium + Hard;
  const proportions = {
    easy: Easy / totalSolved,
    medium: Medium / totalSolved,
    hard: Hard / totalSolved,
  };

  const proportionToOffset = (proportion) => {
    //250 = 0%, 0 = 100%
    return 250 + proportion * -250 + 2;
  };

  console.log(proportionToOffset(proportions.easy));
  const circleThickness = 4;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "200px",
        height: "fit-content",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "fit-content",
          width: "fit-content",
          fontSize: "1.5rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {totalSolved}
        </div>
        <svg style={{ height: "100px", width: "100px" }}>
          {!!Easy && (
            <circle
              cx="50"
              cy="50"
              r="40"
              style={{
                fill: "none",
                stroke: PROBLEM_DIFFICULTY.Easy,
                strokeWidth: circleThickness,
                strokeDasharray: 250,
                strokeDashoffset: proportionToOffset(proportions.easy),
              }}
            />
          )}
          {!!Medium && (
            <circle
              cx="50"
              cy="50"
              r="40"
              style={{
                fill: "none",
                stroke: PROBLEM_DIFFICULTY.Medium,
                strokeWidth: circleThickness,
                strokeDasharray: 250,
                strokeDashoffset: proportionToOffset(proportions.medium),
                transformOrigin: "center",
                transform: `rotate(${proportions.easy * 360}deg)`,
              }}
            />
          )}
          {!!Hard && (
            <circle
              cx="50"
              cy="50"
              r="40"
              style={{
                fill: "none",
                stroke: PROBLEM_DIFFICULTY.Hard,
                strokeWidth: circleThickness,
                strokeDasharray: 250,
                strokeDashoffset: proportionToOffset(proportions.hard),
                transformOrigin: "center",
                transform: `rotate(${
                  (proportions.easy + proportions.medium) * 360
                }deg)`,
              }}
            />
          )}
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "1.25rem",
          gap: "0.5rem",
        }}
      >
        <div style={classes.solvedWrapper}>
          <span style={{ color: PROBLEM_DIFFICULTY.Easy }}>Easy</span> {Easy}
        </div>
        <div style={classes.solvedWrapper}>
          <span style={{ color: PROBLEM_DIFFICULTY.Medium }}>Medium</span>
          {Medium}
        </div>
        <div style={classes.solvedWrapper}>
          <span style={{ color: PROBLEM_DIFFICULTY.Hard }}>Hard</span> {Hard}
        </div>
      </div>
    </div>
  );
}
