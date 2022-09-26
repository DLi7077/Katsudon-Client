import { Avatar, IconButton, TextField, Tooltip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { get, reduce } from "lodash";
import { useState } from "react";
import FollowList from "./FollowList";
import "./styles.css";
import currentUser from "../../../Utils/UserTools";
import EditIcon from "@mui/icons-material/Edit";
import UserAPI from "../../../Api/UserAPI";

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
export default function UserProfile(props) {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [updatedBio, setUpdatedBio] = useState("");
  function handleCloseFollowers() {
    setShowFollowers(false);
  }
  function handleCloseFollowing() {
    setShowFollowing(false);
  }

  const { userInfo } = props;
  const {
    username,
    biography,
    followers,
    following,
    profile_picture_url,
    solved,
  } = userInfo;

  const { Easy, Medium, Hard } = reduce(
    solved,
    (accumulator, problem) => {
      const currDifficulty = get(problem, "difficulty");
      accumulator[currDifficulty] += 1;

      return accumulator;
    },
    { Easy: 0, Medium: 0, Hard: 0 }
  );
  const totalSolved = Easy + Medium + Hard;

  function startEditBiography() {
    setEditingBio(true);
    setUpdatedBio(biography);
  }

  function cancelUpdatedBiography() {
    setEditingBio(false);
  }

  async function submitUpdatedBiography() {
    if (biography == updatedBio) {
      setEditingBio(false);
      return;
    }
    await UserAPI.updateBiography(updatedBio, currentUser("auth_token"));
    setEditingBio(false);
    window.location.reload(false);
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
            <div className="follow-stat">
              <div className="follow-value">{followers.length}</div>
              <div
                className="follow-text"
                onClick={() => {
                  setShowFollowers(true);
                }}
              >
                Followers
              </div>
            </div>
            <div className="profile-picture" style={{ position: "relative" }}>
              <Avatar
                src={profile_picture_url}
                style={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid white",
                }}
              />
              {currentUser("logged_in") && currentUser("_id") === userInfo._id && (
                <>
                  <input
                    type="file"
                    name="imgfile"
                    accept="image/*"
                    id="upload-profile-picture"
                    onChange={props.changeProfilePicture}
                    hidden
                  />
                  <label htmlFor="upload-profile-picture">
                    <div
                      className={
                        currentUser("logged_in") &&
                        currentUser("_id") === userInfo._id
                          ? "profile-picture-upload"
                          : ""
                      }
                    >
                      <UploadFileIcon style={{ fontSize: "2.5rem" }} />
                      Upload Profile Picture
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="follow-stat">
              <div className="follow-value">{following.length}</div>
              <div
                className="follow-text"
                onClick={() => {
                  setShowFollowing(true);
                }}
              >
                Following
              </div>
            </div>
          </div>
          <div className="profile-username">{username}</div>
          <div className="profile-biography" style={{ position: "relative" }}>
            {!editingBio && <>{biography ?? ""}</>}
            {currentUser("logged_in") &&
              currentUser("_id") === userInfo._id &&
              !editingBio && (
                <IconButton
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "white",
                    padding: "0.25rem",
                  }}
                  onClick={() => {
                    startEditBiography();
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
            {editingBio && (
              <TextField
                variant="standard"
                value={updatedBio}
                multiline
                rows={4}
                color="primary"
                inputProps={{
                  style: {
                    fontSize: "1.35rem",
                    color: "white",
                    textAlign: "center",
                  },
                }}
                onChange={(e) => {
                  setUpdatedBio(e.target.value);
                }}
              />
            )}
            {editingBio && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <IconButton
                  style={{ color: "#FFAC7D", padding: "0.25rem" }}
                  onClick={() => {
                    cancelUpdatedBiography();
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#7AFF87", padding: "0.25rem" }}
                  onClick={() => {
                    submitUpdatedBiography();
                  }}
                >
                  <CheckIcon />
                </IconButton>
              </div>
            )}
          </div>
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
