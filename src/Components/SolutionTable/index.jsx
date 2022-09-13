import { useState } from "react";
import { map } from "lodash";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SolutionRow from "./SolutionRow.jsx";
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
      padding: "0.5rem",
    },
    tableCell: {
      textAlign: "left",
      fontSize: "1.15rem",
      color: "white",
      margin: 0,
      padding: 0,
      paddingInline: "1rem",
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
    sortIcon: {
      color: "white",
      fontSize: "3rem",
    },
  };

  const [anchorElement, setAnchorElement] = useState(null);

  const sortDirStatus = (sortKey) => {
    if (props.sortBy === sortKey) {
      if (props.queryParams.sortDir === "asc")
        return <KeyboardArrowDownIcon style={classes.arrowIcon} />;

      if (props.queryParams.sortDir === "desc")
        return <KeyboardArrowUpIcon style={classes.arrowIcon} />;
    }
    return <></>;
  };

  const sortKeys = [
    { label: "Problem", value: "problem_id" },
    { label: "Solved At", value: "last_solved_at" },
  ];

  return (
      <Table className="solution-table">
        <TableHead>
          <TableRow className="header">
            <TableCell style={classes.tableHeader}>
              <IconButton
                style={classes.iconButton}
                onClick={(e) => {
                  setAnchorElement(e.currentTarget);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SortIcon style={classes.sortIcon} />
                </div>
              </IconButton>
              <Menu
                anchorEl={anchorElement}
                open={!!anchorElement}
                onClose={() => setAnchorElement(null)}
                style={{ marginLeft: "-1rem", opacity: 0.75 }}
              >
                {map(sortKeys, (key, idx) => {
                  return (
                    <MenuItem
                      key={idx}
                      style={{
                        width: "100px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.5rem",
                        fontSize: "1.15rem",
                      }}
                      onClick={() => {
                        props.handleSortDirChange(key.value);
                      }}
                    >
                      <div>{key.label}</div>
                      {sortDirStatus(key.value)}
                    </MenuItem>
                  );
                })}
              </Menu>
            </TableCell>

            <TableCell style={classes.tableHeader} colSpan={3}>
              Problem
            </TableCell>
            <TableCell style={classes.tableHeader}>Language</TableCell>
            <TableCell style={classes.tableHeader}>Solution</TableCell>
            <TableCell style={classes.tableHeader}>Solved At</TableCell>
          </TableRow>
        </TableHead>
        {!props.loading && (
          <TableBody
            className="solution-table-body"
            style={{ backgroundColor: props.backgroundColor }}
          >
            {map(props.solutions, (details, idx) => {
              const problemTags = details.problem.tags;
              return (
                <SolutionRow
                  details={details}
                  handleOpenSolutionModel={props.handleOpenSolutionModel}
                  problemTags={problemTags}
                  key={idx}
                />
              );
            })}
          </TableBody>
        )}
        {props.loading && (
          <TableBody>
            <TableRow></TableRow>
            <TableRow>
              <TableCell colSpan={7}>
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
  );
}
