import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  CircularProgress,
} from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { keys, map } from "lodash";
import { PROBLEM_DIFFICULTY } from "../../Constants/colors";
import { LANGUAGE_LOGOS } from "../../Constants/language";
import "./styles.css";

/**
 * @description
 * @param {any} style for header colors
 * @param {any} solutions in the form of:
{
last_solved_at: "2022-08-26T01:41:38.431Z"
problem: {
  _id: '6306cfc384eb7e22c4b0b834',
  id: 1, 
  description: ...,
  difficulty: 'Easy',
  solved_by: []
  tags: ['Array', 'Hash Table']
  title: "Two Sum"
  url: "https://leetcode.com/problems/two-sum/"
}
solutions:{
  C#:{
    created_at: "2022-08-26T01:41:38.431Z"
    memory_usage_mb: 44.2
    problem_id: "6306cfc384eb7e22c4b0b834"
    runtime_ms: 157
    solution_code: "public class Solution \n{\n    public int[] TwoSum(int[] nums, int target) \n    {\n        var idx = new Dictionary<int, int>();\n        \n        for (int i = 0; i < nums.Length; ++i)\n            if (!idx.ContainsKey(target - nums[i]))\n                idx[nums[i]] = i;\n            else\n                return new [] {idx[target - nums[i]], i};\n        \n        return new int[0];\n    }\n}"
    solution_language: "C#"
    user_id: "63081fe50cc2604b938631e1"
  }
}
*/
export default function SolutionTable(props) {
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
    iconButton: {
      color: "white",
      padding: 0,
    },
    arrowIcon: {
      color: "white",
      fontSize: "2rem",
    },
  };

  const isCurrentSort = (sortDir) => {
    return props.sortBy === sortDir && props.sortDir !== 0;
  };

  return (
    <div style={{ overflow: "auto", width: 'min(800px, 100vw)' }}>
      <Table className="solution-table">
        <TableHead>
          <TableRow className="header">
            <TableCell style={classes.tableHeader} colSpan={3}>
              Problem
              <IconButton
                style={classes.iconButton}
                onClick={() => {
                  props.handleSortDirChange("problem_id");
                }}
              >
                {isCurrentSort("problem_id") && props.sortDir === 1 && (
                  <KeyboardArrowUpIcon style={classes.arrowIcon} />
                )}
                {isCurrentSort("problem_id") && props.sortDir === 2 && (
                  <KeyboardArrowDownIcon style={classes.arrowIcon} />
                )}
                {!isCurrentSort("problem_id") && (
                  <HorizontalRuleIcon style={classes.arrowIcon} />
                )}
              </IconButton>
            </TableCell>
            <TableCell style={classes.tableHeader}>Language</TableCell>
            <TableCell style={classes.tableHeader}>Solution</TableCell>
            <TableCell style={classes.tableHeader}>
              Solved At
              <IconButton
                style={classes.iconButton}
                onClick={() => {
                  props.handleSortDirChange("last_solved_at");
                }}
              >
                {isCurrentSort("last_solved_at") && props.sortDir === 1 && (
                  <KeyboardArrowUpIcon style={classes.arrowIcon} />
                )}
                {isCurrentSort("last_solved_at") && props.sortDir === 2 && (
                  <KeyboardArrowDownIcon style={classes.arrowIcon} />
                )}
                {!isCurrentSort("last_solved_at") && (
                  <HorizontalRuleIcon style={classes.arrowIcon} />
                )}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>

        {!props.loading && (
          <TableBody
            className="solution-table-body"
            style={{ backgroundColor: props.backgroundColor }}
          >
            {map(props.solutions, (details, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell
                    style={{
                      ...classes.tableCell,
                    }}
                    colSpan={3}
                  >
                    <a
                      href={details.problem.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: PROBLEM_DIFFICULTY[details.problem.difficulty],
                        ...classes.link,
                      }}
                    >
                      {details.problem.id}. {details.problem.title}
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
                      {map(keys(details.solutions), (language, idx) => {
                        return (
                          <img
                            key={idx}
                            src={LANGUAGE_LOGOS[language]}
                            alt={language}
                            style={classes.languageLogo}
                          />
                        );
                      })}
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
                    {details.last_solved_at.substring(0, 10)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
        {props.loading && (
          <TableBody>
            <TableRow></TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress
                    style={{
                      color: "white",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}
