import { TableRow, TableCell, IconButton } from "@mui/material";
import { keys, map, take } from "lodash";
import { PROBLEM_DIFFICULTY } from "../../Constants/colors";
import { LANGUAGE_LOGOS } from "../../Constants/language";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import "./styles.css";

export default function SolutionRow(props) {
  const classes = {
    tableHeader: {
      color: props.headerColor,
      fontSize: "1.4rem",
    },
    tableCell: {
      textAlign: "left",
      fontSize: "1.15rem",
      color: "white",
      margin: 0,
      padding: 0,
      paddingInline: "1rem",
    },
    fileOpen: { fontSize: "2rem", color: "white" },
    languageLogo: {
      width: "2.5rem",
    },
    link: {
      textDecoration: "none",
    },
  };

  return (
    <TableRow>
      <TableCell
        style={{
          ...classes.tableCell,
          color: PROBLEM_DIFFICULTY[props.details.problem.difficulty],
        }}
      >
        {props.details.problem.id}
      </TableCell>
      <TableCell
        style={{
          ...classes.tableCell,
          position: "relative",
        }}
        colSpan={3}
      >
        <a
          href={props.details.problem.url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: PROBLEM_DIFFICULTY[props.details.problem.difficulty],
            ...classes.link,
          }}
        >
          {props.details.problem.title}
        </a>
      </TableCell>
      <TableCell style={classes.tableCell}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {map(take(keys(props.details.solutions), 4), (language, idx) => {
            return (
              <img
                key={idx}
                src={LANGUAGE_LOGOS[language]}
                alt={language}
                style={classes.languageLogo}
              />
            );
          })}

          {keys(props.details.solutions).length > 4 && (
            <div>+{keys(props.details.solutions).length - 4}</div>
          )}
        </div>
      </TableCell>
      <TableCell style={classes.tableCell}>
        <IconButton
          onClick={() => {
            props.handleOpenSolutionModel(
              props.details.problem,
              props.details.solutions
            );
          }}
        >
          <FileOpenIcon style={classes.fileOpen} />
        </IconButton>
      </TableCell>
      <TableCell style={classes.tableCell}>
        {props.details.last_solved_at.substring(0, 10)}
      </TableCell>
    </TableRow>
  );
}
