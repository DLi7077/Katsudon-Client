import { useState } from "react";
import FollowList from "./FollowList";
import DifficultyBar from "./DifficultyBar";
import "./styles.css";
import ProfileAvatar from "./ProfileAvatar";
import Biography from "./Biography";

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
export default function UserProfile(props) {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const { userInfo } = props;
  const { username, followers, following, solved } = userInfo;

  function handleCloseFollowers() {
    setShowFollowers(false);
  }
  function handleCloseFollowing() {
    setShowFollowing(false);
  }
  function handleShowFollowers() {
    setShowFollowers(true);
  }
  function handleShowFollowing() {
    setShowFollowing(true);
  }

  function Followers() {
    return (
      <div className="follow-stat">
        <div className="follow-value">{followers.length}</div>
        <div className="follow-text" onClick={handleShowFollowers}>
          Followers
        </div>
      </div>
    );
  }
  function Following() {
    return (
      <div className="follow-stat">
        <div className="follow-value">{following.length}</div>
        <div className="follow-text" onClick={handleShowFollowing}>
          Following
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="profile-container"
        style={{
          border: `2px solid ${props.borderColor ?? "white"}`,
          position: "relative",
        }}
      >
        <div className="profile-user-info">
          <div className="profile-top-wrapper">
            <Followers />
            <ProfileAvatar userInfo={userInfo} />
            <Following />
          </div>
          <div className="profile-username">{username}</div>
          <Biography userInfo={userInfo} />
        </div>
        <DifficultyBar solvedProblems={solved} />
      </div>
      <FollowList
        title="Following"
        users={following}
        open={showFollowing}
        handleClose={handleCloseFollowing}
      />
      <FollowList
        title="Followers"
        users={followers}
        open={showFollowers}
        handleClose={handleCloseFollowers}
      />
    </>
  );
}
