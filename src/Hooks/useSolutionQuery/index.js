import { useState } from "react";

export default function useSolutionQuery() {
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [problemTags, setProblemTags] = useState(["Array"]);
  const [difficulty, setDifficulty] = useState("Hard");

  const VALID_SORT_BYS = [
    { label: "Solved at", value: "created_at" },
    { label: "Problem ID", value: "problem_id" },
  ];


  return {
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    problemTags,
    setProblemTags,
    difficulty,
    setDifficulty,
  };
}
