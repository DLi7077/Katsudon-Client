import DifficultyFilter from "./DifficultyFilter";
import SortDirection from "./SortQuery";

const classes = {
  filterContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingInline: "0.5rem",
    display: "flex",
    alignItems: "center",
  },
  dropdownButton: {
    borderRadius: "1rem",
  },
};

export default function SolutionFilter(props) {
  return (
    <div style={classes.filterContainer}>
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
  );
}
