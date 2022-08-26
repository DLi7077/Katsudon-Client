import { Avatar, Tooltip } from "@mui/material";
import "./styles.css";

const fractionToPercent = (fraction) => {
  return `${fraction * 100}%`;
};

const difficultyGenerator = (solved, total, difficulty) => {
  const difficultyTitle = difficulty[0].toUpperCase() + difficulty.slice(1);
  return (
    !!solved && (
      <Tooltip
        title={
          <div style={{ fontSize: "1rem" }}>
            {difficultyTitle}: {solved}
          </div>
        }
      >
        <div
          className={`profile-solved-${difficulty}`}
          style={{
            width: fractionToPercent(total ? solved / total : 0),
          }}
        />
      </Tooltip>
    )
  );
};

/**
 * @param {string} username
 * @param {string} profile_picture_url
 * @param {number} followers
 * @param {number} following
 * @param {string} biography
 * @param {number} easySolved
 * @param {number} mediumSolved
 * @param {number} hardSolved
 * @returns A profile component
 */
export default function Profile(props) {
  const { userInfo } = props;
  const { username, biography, followers, following, profile_picture_url } =
    userInfo;

  const { Easy, Medium, Hard } = props.difficultyDistribution;
  const totalSolved = Easy + Medium + Hard;
  return (
    <div className="profile-container">
      <div className="profile-user-info">
        <div className="profile-top-wrapper">
          <div className="follow-stat">
            <div className="follow-value">{followers.length}</div>
            <div className="follow-text"> Followers</div>
          </div>
          <div className="profile-picture">
            <Avatar
              src={profile_picture_url}
              style={{
                width: "100%",
                height: "100%",
                border: "2px solid white",
              }}
            />
          </div>
          <div className="follow-stat">
            <div className="follow-value">{following.length}</div>
            <div className="follow-text"> Following</div>
          </div>
        </div>
        <div className="profile-username">{username}</div>
        <div className="profile-biography">{biography ?? ""}</div>
      </div>
      <div className="profile-solved-section">
        <div className="profile-solved-count">Solved: {totalSolved}</div>
        <div className="profile-solved-distribution">
          {difficultyGenerator(Easy, totalSolved, "easy")}
          {difficultyGenerator(Medium, totalSolved, "medium")}
          {difficultyGenerator(Hard, totalSolved, "hard")}
        </div>
      </div>
    </div>
  );
}
