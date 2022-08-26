import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { keys, map, omit, without } from "lodash";
import { PROBLEM_DIFFICULTY } from "../../Constants/colors";
import { LANGUAGE_LOGOS } from "../../Constants/language";
import "./styles.css";

/**
 * @description
 * @param {any} style for header colors
 * @param {any} solutions in the form of:
"1": {
  "problem": {
    "description": "<div><p>Given an array of integers...",
    "difficulty": "Easy",
    "solved_by": [
      "6306b34920cf5f80f7d0c20d"
    ],
    "tags": [
      "Array",
      "Hash Table"
    ],
    "title": "Two Sum",
    "url": "https://leetcode.com/problems/two-sum/"
  },
  "solutions": {
    "Java": {
      "solution_language": "Java",
      "solution_code": "class Solution {\n...,
      "runtime_ms": 50,
      "memory_usage_mb": 42.5,
    },
  }
}
*/

const headers = ["Problem", "Language", "Solution", "Solved At"];

export default function SolutionTable(props) {
  const classes = {
    table: {},
    tableHeader: { ...props.style, fontSize: "1.5rem" },
    tableCell: {
      textAlign: "left",
      fontSize: "1.25rem",
      color: "white",
      margin: 0,
      padding: 0,
      paddingInline: "1rem",
    },
    fileOpen: { fontSize: "2rem", color: "white" },
    languageLogo: {
      width: "2.5rem",
    },
  };

  return (
    <div style={{ overflow: "auto" }}>
      <Table className="solution-table">
        <TableHead>
          <TableRow className="header">
            {headers.map((header, idx) => {
              return (
                <TableCell key={idx} style={classes.tableHeader}>
                  {header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody className="solution-table-body">
          {map(
            omit(props.solutions, "difficulty_distribution"),
            (details, id) => {
              return (
                <TableRow key={id}>
                  <TableCell
                    style={{
                      ...classes.tableCell,
                      color: PROBLEM_DIFFICULTY[details.problem.difficulty],
                    }}
                  >
                    {id}. {details.problem.title}
                  </TableCell>
                  <TableCell style={classes.tableCell}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {map(
                        without(keys(details.solutions), "recent"),
                        (language, idx) => {
                          return (
                            <img
                              key={idx}
                              src={LANGUAGE_LOGOS[language]}
                              alt="language"
                              style={classes.languageLogo}
                            />
                          );
                        }
                      )}
                    </div>
                  </TableCell>
                  <TableCell style={classes.tableCell}>
                    <IconButton
                      onClick={() => {
                        props.handleOpenSolutionModel(
                          details.problem,
                          details.solutions
                        );
                      }}
                    >
                      <FileOpenIcon style={classes.fileOpen} />
                    </IconButton>
                  </TableCell>
                  <TableCell style={classes.tableCell}>
                    {details.solutions.recent.substring(0, 10)}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
}
