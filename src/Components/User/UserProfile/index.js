import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileBiography } from "../../../Store/Reducers/user";
import { Avatar, IconButton, TextField } from "@mui/material";
import { get } from "lodash";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import FollowList from "./FollowList";
import UserAPI from "../../../Api/UserAPI";
import DifficultyBar from "./DifficultyBar";
import { updateProfilePicture } from "../../../Store/Reducers/user";
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
export default function UserProfile(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(currentUser.biography);

  const { userInfo } = props;
  const {
    username,
    biography,
    followers,
    following,
    profile_picture_url,
    solved,
  } = userInfo;

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

  function startEditBiography() {
    setEditingBio(true);
  }

  function cancelUpdatedBiography() {
    setEditingBio(false);
  }

  async function handleUploadProfilePicture(event) {
    if (!event.target.files) return;

    const bannerPicture = event.target.files[0];
    const formData = new FormData();
    formData.append("imgfile", bannerPicture);

    await UserAPI.uploadProfilePicture(formData, get(currentUser, "auth_token"))
      .then((res) => {
        dispatch(
          updateProfilePicture({
            profile_picture_url: `${
              res.user.profile_picture_url
            }?${global.Date.now()}`, // force rerender
          })
        );
      })
      .catch(() => {
        console.error("couldnt upload");
      });
  }

  async function submitUpdatedBiography() {
    if (biography === updatedBio) {
      setEditingBio(false);
      return;
    }

    await UserAPI.updateBiography(updatedBio)
      .then((res) => {
        const updatedBiography = get(res.user, "biography");
        dispatch(updateProfileBiography({ biography: updatedBiography }));
        return updatedBiography;
      })
      .then((updatedBiography) => {
        setUpdatedBio(updatedBiography);
      })
      .finally(() => setEditingBio(false));
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
  function ProfileUpload() {
    return (
      <>
        <input
          type="file"
          name="imgfile"
          accept="image/*"
          id="upload-profile-picture"
          onChange={handleUploadProfilePicture}
          hidden
        />
        <label htmlFor="upload-profile-picture">
          <div
            className={
              get(currentUser, "logged_in") &&
              get(currentUser, "user_id") === userInfo._id
                ? "profile-picture-upload"
                : ""
            }
          >
            <UploadFileIcon style={{ fontSize: "2.5rem" }} />
            Upload Profile Picture
          </div>
        </label>
      </>
    );
  }
  function EditBiographyButton() {
    return (
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
    );
  }

  function EditBiographyField() {
    return (
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
            <div className="profile-picture" style={{ position: "relative" }}>
              <Avatar
                src={
                  get(currentUser, "user_id") === userInfo._id
                    ? currentUser.profile_picture_url
                    : profile_picture_url
                }
                style={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid white",
                }}
              />
              {get(currentUser, "user_id") === userInfo._id && (
                <ProfileUpload />
              )}
            </div>
            <Following />
          </div>
          <div className="profile-username">{username}</div>
          <div className="profile-biography" style={{ position: "relative" }}>
            {!editingBio &&
              (get(currentUser, "user_id") === userInfo._id
                ? currentUser.biography
                : biography ?? "")}

            {get(currentUser, "user_id") === userInfo._id && !editingBio && (
              <EditBiographyButton />
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
                  onClick={cancelUpdatedBiography}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#7AFF87", padding: "0.25rem" }}
                  onClick={submitUpdatedBiography}
                >
                  <CheckIcon />
                </IconButton>
              </div>
            )}
          </div>
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
