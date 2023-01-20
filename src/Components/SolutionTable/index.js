import { map } from "lodash";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import SolutionRow from "./SolutionRow.js";
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
  },
  failed:true
}
*/
export default function SolutionTable(props) {
  const classes = {
    tableHeader: {
      color: props.headerColor,
      fontSize: "1.4rem",
      padding: "1rem",
      fontFamily: "robotoReg",
    },
    tableCell: {
      textAlign: "left",
      fontSize: "1.15rem",
      color: "white",
      margin: 0,
      padding: 0,
      paddingInline: "1rem",
      fontFamily: "robotoReg",
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

  return (
    <Table>
      <TableHead className="solution-header">
        <TableRow className="header">
          <TableCell style={classes.tableHeader}>#</TableCell>
          <TableCell style={classes.tableHeader} colSpan={3}>
            Problem
          </TableCell>
          <TableCell style={classes.tableHeader}>Solution</TableCell>
          <TableCell style={classes.tableHeader}>Solved</TableCell>
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
