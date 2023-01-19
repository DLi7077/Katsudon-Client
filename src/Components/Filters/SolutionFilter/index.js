import DifficultyFilter from "./DifficultyFilter";
import ProblemTagFilter from "./ProblemTagFilter";
import SortDirection from "./SortQuery";
import "./styles.css";

const classes = {
  selectContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingTop: "1rem",
    marginInline: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  filterContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
};

export default function SolutionFilter(props) {
  return (
    <div className="filter-container">
      <div style={classes.selectContainer}>
        <DifficultyFilter
          difficulty={props.difficulty}
          setDifficulty={props.setDifficulty}
        />
        <SortDirection
          sortBy={props.sortBy}
          setSortBy={props.setSortBy}
          sortDir={props.sortDir}
          setSortDir={props.setSortDir}
        />
      </div>
      <ProblemTagFilter
        problemTags={props.problemTags}
        setProblemTags={props.setProblemTags}
        solved={props.solved}
        selectedTags={props.problemTags}
        updateSkillQuery={props.updateSkillQuery}
      />
    </div>
  );
}
