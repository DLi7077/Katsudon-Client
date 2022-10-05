import { TableRow, TableCell, IconButton } from "@mui/material";
import { get, keys, map, omit, take } from "lodash";
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
      height: "2rem",
    },
    crossOut: {
      position: "absolute",
      width: "2rem",
      height: "3px",
      backgroundColor: "#FF4500",
      top: "45%",
      left: "50%",
      translate: "-50% -50%",
      rotate: "-45deg",
    },
  };

  const SHOWN_LANGUAGES = 2;

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
          className="hover-link"
          style={{
            color: PROBLEM_DIFFICULTY[props.details.problem.difficulty],
          }}
        >
          {props.details.problem.title}
        </a>
      </TableCell>
      <TableCell style={{ ...classes.tableCell, paddingInline: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "4px",
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => {
              props.handleOpenSolutionModel(
                props.details.problem,
                props.details.solutions
              );
            }}
          >
            <div style={{ position: "relative" }}>
              <FileOpenIcon style={classes.fileOpen} />
              {!!get(props.details.solutions, "failed") && (
                <div style={classes.crossOut} />
              )}
            </div>
          </IconButton>
          <div style={{ display: "flex", gap: "2px" }}>
            {map(
              take(
                keys(omit(props.details.solutions, "failed")),
                SHOWN_LANGUAGES
              ),
              (language, idx) => {
                return (
                  <img
                    key={idx}
                    src={LANGUAGE_LOGOS[language]}
                    alt={language}
                    style={classes.languageLogo}
                  />
                );
              }
            )}

            {keys(props.details.solutions).length > SHOWN_LANGUAGES && (
              <div>
                +{keys(props.details.solutions).length - SHOWN_LANGUAGES}
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell style={classes.tableCell}>
        {props.details.last_solved_at.substring(0, 10)}
      </TableCell>
    </TableRow>
  );
}
