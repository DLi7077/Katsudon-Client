import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import { useFormik } from "formik";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import * as yup from "yup";
import UserAPI from "../../Api/UserAPI";
import currentUser, { handleLogin } from "../../Utils/UserTools";

const classes = {
  root: { borderBottom: "1px solid white" },
  textInput: {
    input: { color: "white", fontSize: "1.5rem" },
    label: { color: "gray", fontSize: "1.25rem" },
  },
};

export default function Login(props) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(null);
  const navigate = useNavigate();

  async function login(userDetails) {
    setTimeout(async () => {
      await UserAPI.login(userDetails)
        .then((res) => {
          const accessToken = get(res, "access_token");
          if (!accessToken) {
            setSnackbarContent({
              message: "Could not retrieve token",
              severity: "error",
            });
            return;
          }

          setSnackbarContent({
            message: "Successfully logged in!",
            severity: "success",
          });

          const loginDetails = {
            auth_token: accessToken,
            user_id: get(res, "currentUser._id"),
            username: get(res, "currentUser.username"),
            profile_picture: get(res, "currentUser.profile_picture_url"),
            following: get(res, "currentUser.following"),
          };

          handleLogin(loginDetails);

          navigate(`/profile?user_id=${currentUser("user-id")}`);

          window.location.reload(false);
        })
        .catch((e) => {
          console.error(e);
          setSnackbarContent({
            message: "Incorrect credentials",
            severity: "error",
          });
        })
        .finally(setShowSnackbar(true));
    }, 300);
  }

  // const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
  const validation = yup.object().shape({
    email: yup
      .string()
      // .matches(emailRegex, "Invalid email")
      .required("Please enter email"),
    password: yup.string().required("Please enter password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (data) => {
      login(data);
    },
  });

  const snackbarMessage = (snackbarContent) => {
    const message = get(snackbarContent, "message");
    const severity = get(snackbarContent, "severity");
    return (
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={hideSnackbar}
      >
        <Alert
          onClose={hideSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  };

  function hideSnackbar(event, reason) {
    if (reason === "clickaway") return;

    setShowSnackbar(false);
  }

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      {showSnackbar && snackbarMessage(snackbarContent)}
      <form onSubmit={formik.handleSubmit} className="login-register-form">
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          type="text"
          label="Email"
          name="email"
          variant="standard"
          onChange={formik.handleChange}
          sx={classes.textInput}
        />
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          type="password"
          label="Password"
          name="password"
          variant="standard"
          onChange={formik.handleChange}
          sx={classes.textInput}
        />
        <Button type="submit" sx={{ color: "white", fontSize: "1.25rem" }}>
          Login
        </Button>
      </form>
    </div>
  );
}
