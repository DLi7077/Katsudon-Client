import { Avatar } from "@mui/material";
import "./styles.css";

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
  const fractionToPercent = (fraction) => {
    return `${fraction * 100}%`;
  };

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
          <div
            className="profile-solved-easy"
            style={{
              width: fractionToPercent(totalSolved ? Easy / totalSolved : 0),
            }}
          />
          <div
            className="profile-solved-medium"
            style={{
              width: fractionToPercent(totalSolved ? Medium / totalSolved : 0),
            }}
          />
          <div
            className="profile-solved-hard"
            style={{
              width: fractionToPercent(totalSolved ? Hard / totalSolved : 0),
            }}
          />
        </div>
      </div>
    </div>
  );
}
