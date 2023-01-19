import DifficultyFilter from "./DifficultyFilter";

const classes = {
  filterContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: "0.5rem",
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
    </div>
  );
}
