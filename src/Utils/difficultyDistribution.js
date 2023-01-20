import { reduce, get } from "lodash";

export default function difficultyDistribution(solvedProblems) {
  const { Easy, Medium, Hard } = reduce(
    solvedProblems,
    (accumulator, problem) => {
      const currDifficulty = get(problem, "difficulty");
      accumulator[currDifficulty] += 1;

      return accumulator;
    },
    { Easy: 0, Medium: 0, Hard: 0 }
  );

  return { Easy, Medium, Hard };
}
