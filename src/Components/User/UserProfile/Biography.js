import React from "react";
import { get } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField } from "@mui/material";
import UserAPI from "../../../Api/UserAPI";
import { updateProfileBiography } from "../../../Store/Reducers/user";
import {
  setSnackbarSuccess,
  setSnackbarWarning,
} from "../../../Store/Reducers/snackbar";

export default function Biography(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [editingBio, setEditingBio] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(currentUser.biography);
  function startEditBiography() {
    setEditingBio(true);
  }

  function cancelUpdatedBiography() {
    setEditingBio(false);
  }

  async function submitUpdatedBiography() {
    if (currentUser.biography === updatedBio) {
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
        dispatch(setSnackbarSuccess("Updated biography"));
      })
      .catch((error) => {
        if (!currentUser.verifed) {
          dispatch(setSnackbarWarning(error.response.data));
        } else dispatch(setSnackbarWarning("Couldn't update biography"));
      })
      .finally(() => {
        setEditingBio(false);
      });
  }

  return (
    <div className="profile-biography" style={{ position: "relative" }}>
      {!editingBio && (
        <div style={{ padding: "0.25rem", color: "white" }}>
          {get(currentUser, "user_id") === props.userInfo._id
            ? currentUser.biography
            : props.userInfo.biography ?? ""}
        </div>
      )}

      {get(currentUser, "user_id") === props.userInfo._id && !editingBio && (
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
        <>
          <TextField
            variant="standard"
            value={updatedBio}
            multiline
            rows={4}
            color="primary"
            inputProps={{
              style: {
                fontSize: "1.25rem",
                color: "white",
                textAlign: "center",
              },
            }}
            onChange={(e) => {
              setUpdatedBio(e.target.value);
            }}
          />
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
        </>
      )}
    </div>
  );
}
