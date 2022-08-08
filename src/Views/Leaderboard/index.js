import { useEffect, useState } from "react";
import { get, map } from "lodash";
import GithubAPI from "../../Api/GithubAPI";
import { Button } from "@mui/material";
import CodeBlock from "../../Components/Codeblock";

export default function Leaderboard() {
  const repository = "DLi7077/Leetcode-Solutions";
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [solution, setSolution] = useState("");

  async function getSolutions(repository) {
    setLoading(true);
    await GithubAPI.getRepositoryFiles(repository).then((res) => {
      setSolvedCount(res.count);
      setSolvedProblems(res.rows);
    });
    setLoading(false);
  }
  const showSolution = async (repository, file) => {
    await GithubAPI.getSolutionFile(repository, file).then((res) => {
      setShow(true);
      setSolution(get(res.data, "solution") ?? "");
    });
  };

  useEffect(() => {
    getSolutions(repository);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {!loading &&
          map(solvedProblems, (title, idx) => {
            return (
              <div key={idx}>
                <Button
                  onClick={() => {
                    showSolution(repository, `${title.value}.cpp`);
                    console.log(solution);
                  }}
                >
                  {title.label[0]} {title.label[1]}
                </Button>
              </div>
            );
          })}
      </div>
      {show && (
        <div style={{ width: "100%", maxHeight: "80vh", overflow: "auto" }}>
          <CodeBlock code={solution} />
        </div>
      )}
    </div>
  );
}
