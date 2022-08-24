import { Avatar } from "@mui/material";
import pfp from "../../Assets/devin.jpg";
import "./styles.css";
/**
 * @param {string} username
 * @param {string} profilePictureURL
 * @param {number} followers
 * @param {number} following
 * @param {string} biography
 * @param {number} easySolved
 * @param {number} mediumSolved
 * @param {number} hardSolved
 * @returns A profile component
 */
export default function Profile(props) {
  const username = "ButterRiolu";
  const profilePicture = pfp;
  const followers = 10;
  const following = 100;
  const biography = "Hey its me";
  const easySolved = 136;
  const mediumSolved = 106;
  const hardSolved = 6;
  const totalSolved = easySolved + mediumSolved + hardSolved;

  const fractionToPercent = (fraction) => {
    return `${fraction * 100}%`;
  };

  return (
    <div className="profile-container">
      <div className="profile-user-info">
        <div className="profile-top-wrapper">
          <div className="follow-stat">
            <div className="follow-value">{followers}</div>
            <div className="follow-text"> Followers</div>
          </div>
          <div className="profile-picture">
            <Avatar
              src={profilePicture}
              style={{
                width: "100%",
                height: "100%",
                border: "2px solid white",
              }}
            />
          </div>
          <div className="follow-stat">
            <div className="follow-value">{following}</div>
            <div className="follow-text"> Following</div>
          </div>
        </div>
        <div className="profile-username">{username}</div>
        <div className="profile-biography">{biography}</div>
      </div>
      <div className="profile-solved-section">
        <div className="profile-solved-count">Solved: {totalSolved}</div>
        <div className="profile-solved-distribution">
          <div
            className="profile-solved-easy"
            style={{ width: fractionToPercent(easySolved / totalSolved) }}
          />
          <div
            className="profile-solved-medium"
            style={{ width: fractionToPercent(mediumSolved / totalSolved) }}
          />
          <div
            className="profile-solved-hard"
            style={{ width: fractionToPercent(hardSolved / totalSolved) }}
          />
        </div>
      </div>
    </div>
  );
}
