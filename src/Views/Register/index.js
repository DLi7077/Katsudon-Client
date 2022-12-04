import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../../Api/UserAPI";
import { useFormik } from "formik";
import { Button, TextField, CircularProgress } from "@mui/material";
import * as yup from "yup";

const classes = {
  root: { borderBottom: "1px solid white" },
  textInput: {
    input: { color: "white", fontSize: "1.5rem" },
    label: { color: "gray", fontSize: "1.25rem" },
  },
};

export default function Register(props) {
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [created, setCreated] = useState(false);

  async function createAccount(userDetails) {
    setCreating(true);
    await UserAPI.createAccount(userDetails)
      .then(setCreateSuccess(true))
      .catch((e) => {
        setCreateSuccess(false);
      })
      .finally(setCreated(true));

    setCreating(false);
  }

  const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
  const validation = yup.object().shape({
    email: yup
      .string()
      .matches(emailRegex, "Invalid email")
      .required("Email required"),
    username: yup
      .string()
      .min(4, "must be at least 4 characters")
      .max(20, "must be at most 20 characters")
      .required("Username required"),
    password: yup
      .string()
      .min(5, "must be at least 5 characters")
      .max(30, "must be at most 30 characters")
      .required("Password required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (data) => {
      createAccount(data);
    },
  });

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      {!creating && !created && (
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
            error={Boolean(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            type="text"
            label="Username (display name)"
            name="username"
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
          <TextField
            error={Boolean(
              formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
            )}
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
            type="password"
            label="Confirm Password"
            name="passwordConfirmation"
            variant="standard"
            onChange={formik.handleChange}
            sx={classes.textInput}
          />
          <Button type="submit" sx={{ color: "white", fontSize: "1.25rem" }}>
            Create Account
          </Button>
        </form>
      )}
      {creating && <CircularProgress style={{ color: props.color }} />}
      {!creating && created && (
        <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
          {createSuccess && (
            <>
              Account successfully created! Click{" "}
              <Link
                to="/get-started"
                target="_blank"
                rel="noreferrer"
                style={{ color: props.color }}
              >
                here
              </Link>{" "}
              for next steps
            </>
          )}
          {!createSuccess && (
            <>
              Something went wrong with creating your account.. Please try again
              later
            </>
          )}
        </div>
      )}
    </div>
  );
}
