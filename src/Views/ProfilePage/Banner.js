import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import UserAPI from "../../Api/UserAPI";
import fallbackBanner from "../../Assets/banner.jpg";
import { get } from "lodash";
import { updateProfileBanner } from "../../Store/Reducers/user";
import { IconButton } from "@mui/material";
import {
  setSnackbarSuccess,
  setSnackbarWarning,
} from "../../Store/Reducers/snackbar";

export default function Banner({ userId, bannerUrl }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const [bannerHover, setBannerHover] = useState(false);

  async function handleUploadProfileBanner(event) {
    if (!event.target.files) return;

    const bannerPicture = event.target.files[0];
    const formData = new FormData();
    formData.append("imgfile", bannerPicture);

    await UserAPI.uploadProfileBanner(formData, get(currentUser, "auth_token"))
      .then((res) => {
        dispatch(
          updateProfileBanner({
            profile_banner_url: `${
              res.user.profile_banner_url
            }?${global.Date.now()}`, // force rerender
          })
        );

        dispatch(setSnackbarSuccess("Uploaded banner"));
      })
      .catch(() => {
        if (!currentUser.verified) {
          dispatch(
            setSnackbarWarning("You must verify your account to do this")
          );
        } else dispatch(setSnackbarWarning("File size must be < 5MB"));
      });
  }

  function EditButton(handleClick) {
    return (
      <>
        <input
          type="file"
          name="imgfile"
          accept="image/*"
          id="upload-banner"
          onChange={handleClick}
          hidden
        />
        <label htmlFor="upload-banner">
          <IconButton
            onMouseEnter={() => {
              setBannerHover(true);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setBannerHover(false);
              }, 100);
            }}
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              top: "8px",
              right: "8px",
              padding: "0.5rem",
              zIndex: 3,
              border: "2px solid rgba(255,255,255,0.6)",
            }}
            component="span"
          >
            <EditIcon style={{ fontSize: "1.75rem" }} />
          </IconButton>
        </label>
        {bannerHover && (
          <div className="profile-banner-upload">Upload Profile Banner</div>
        )}
      </>
    );
  }

  return (
    <div className="user-profile-banner" style={{ position: "relative" }}>
      {get(currentUser, "logged_in") &&
        get(currentUser, "user_id") === userId &&
        EditButton(handleUploadProfileBanner)}
      <img
        src={
          get(currentUser, "user_id") === userId
            ? get(currentUser, "profile_banner_url") ?? fallbackBanner
            : bannerUrl ?? fallbackBanner
        }
        style={{ objectFit: "cover", width: "100%" }}
        alt="user banner"
      />
    </div>
  );
}
