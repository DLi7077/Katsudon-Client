import React from "react";
import "./styles.css";
import { Avatar } from "@mui/material";
import UserAPI from "../../../Api/UserAPI";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../../Store/Reducers/user";
import {
  setSnackbarSuccess,
  setSnackbarWarning,
} from "../../../Store/Reducers/snackbar";
import { get } from "lodash";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function ProfileAvatar(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

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

        dispatch(setSnackbarSuccess("Uploaded profile picture"));
      })
      .catch(() => {
        dispatch(setSnackbarWarning("File size must be < 5MB"));
      });
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
              get(currentUser, "user_id") === props.userInfo._id
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
  return (
    <div
      className="profile-picture"
      style={{ position: "relative", ...props.style }}
    >
      <Avatar
        src={
          get(currentUser, "user_id") === props.userInfo._id
            ? currentUser.profile_picture_url
            : get(props, "userInfo.profile_picture_url")
        }
        style={{
          width: "100px",
          height: "100px",
          border: "2px solid white",
        }}
      />
      {get(currentUser, "user_id") === props.userInfo._id && <ProfileUpload />}
    </div>
  );
}
