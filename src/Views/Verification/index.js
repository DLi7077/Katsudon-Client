import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import UserAPI from "../../Api/UserAPI";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Store/Reducers/user";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../Store/Reducers/snackbar";

const classes = {
  root: { borderBottom: "1px solid white" },
  textInput: {
    input: { color: "white", fontSize: "1.5rem" },
    label: { color: "gray", fontSize: "1.25rem" },
  },
};

export default function Verification(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    console.log(currentUser);
    if (!currentUser.logged_in) navigate("/profile");
    if (!currentUser.verified) navigate("/profile");
  }, []);

  const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
  const validation = yup.object().shape({
    email: yup
      .string()
      .matches(emailRegex, "Invalid email")
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
      console.table(data);
    },
  });

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor }}
    >
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
