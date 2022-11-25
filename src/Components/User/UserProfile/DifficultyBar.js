import "./styles.css";

import { Tooltip } from "@mui/material";
import { get, reduce } from "lodash";
const fractionToPercent = (fraction) => {
  return `${fraction * 100}%`;
};

function DifficultyGenerator({ solved, total, difficulty }) {
  const difficultyTitle = difficulty[0].toUpperCase() + difficulty.slice(1);
  return (
    !!solved && (
      <Tooltip
        title={
          <div style={{ fontSize: "1rem" }}>
            {difficultyTitle}: {solved}
          </div>
        }
      >
        <div
          className={`profile-solved-${difficulty}`}
          style={{
            width: fractionToPercent(total ? solved / total : 0),
          }}
        />
      </Tooltip>
    )
  );
}

function DifficultyBar({ solvedProblems }) {
  const { Easy, Medium, Hard } = reduce(
    solvedProblems,
    (accumulator, problem) => {
      const currDifficulty = get(problem, "difficulty");
      accumulator[currDifficulty] += 1;

      return accumulator;
    },
    { Easy: 0, Medium: 0, Hard: 0 }
  );
  const totalSolved = Easy + Medium + Hard;

  return (
    <div className="profile-solved-section">
      <div className="profile-solved-count">Solved: {totalSolved}</div>
      <div className="profile-solved-distribution">
        <DifficultyGenerator
          solved={Easy}
          total={totalSolved}
          difficulty="easy"
        />
        <DifficultyGenerator
          solved={Medium}
          total={totalSolved}
          difficulty="medium"
        />
        <DifficultyGenerator
          solved={Hard}
          total={totalSolved}
          difficulty="hard"
        />
      </div>
    </div>
  );
}

export default DifficultyBar;
