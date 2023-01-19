import { useState } from "react";

export default function useSolutionQuery() {
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [problemTags, setProblemTags] = useState([]);
  const [difficulty, setDifficulty] = useState("All");


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
