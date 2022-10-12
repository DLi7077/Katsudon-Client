import { chain, get, map } from "lodash";

// const SAMPLE_OUTPUT = {
//   user: "Devin",
//   pfp: "profile_picture_url",
//   problems_solved: [
//     { title: "12. House Robber", difficulty: "Medium", language: "Python" },
//     { title: "27. Word Search", difficulty: "Medium", language: "Python" },
//     {
//       title: "135. Longest Increasing Subsequence",
//       difficulty: "Medium",
//       language: "Python",
//     },
//   ],
//   problems_attempted: [
//     { title: "9. Jump Game III", difficulty: "Hard", language: "Python" },
//     { title: "10. Jump Game IV", difficulty: "Medium", language: "Python" },
//   ],
// };

/**
 * @description takes in rows of weekly-solutions api response and converts it into post structure
 * separates attempted and solved problems
 * @returns A generated list of weekly progress posts
 */
export default function postGenerator(weeklySolutions) {
  const posts = map(weeklySolutions, (user) => {
    const postDetails = {
      user_id: user.user_id,
      username: user.username,
      profile_picture_url: user.profile_picture_url,
    };

    postDetails.solved = chain(user.solutions)
      .filter((solutionDetails) => !get(solutionDetails, "solution.failed"))
      .map((solutionDetails) => get(solutionDetails, "solution"))
      .value();

    postDetails.attempted = chain(user.solutions)
      .filter((solutionDetails) => !!get(solutionDetails, "solution.failed"))
      .map((solutionDetails) => get(solutionDetails, "solution"))
      .value();

    const ISODateToFormat = (date) => {
      if (!date || date.length < 10) return "";
      const DATE_LENGTH = 10;

      return date.substring(0, DATE_LENGTH).replaceAll("-", "/");
    };
    postDetails.date = ISODateToFormat(user.date);
    return postDetails;
  });

  return posts;
}
