import React from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string, ref } from "yup";
import lock from "../assets/lock.png";

const initialValues = {
  email: "",
  name: "",
  password: "",
  confirmpassword: "",
  address: "",
  phoneNumber: "",
};

const validationSchema = object({
  email: string().required("Please enter email").email("Invalid email"),
  name: string().required("Please enter name").min(2, "Name too short"),
  password: string()
    .required("Please enter password")
    .min(7, "Password should be minimum 7 characters long"),
  confirmpassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  address: string().required("Please enter your address"),
  phoneNumber: string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number should be exactly 10 digits"),
});

const MaterialForm = () => {
  return (
    <Box
      className="MaterialForm"
      sx={{
        maxWidth: "90%",
        margin: "auto",
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <img src={lock} alt="Logo" style={{ width: "50%", height: "auto" }} />
      </Box>
      <Typography variant="h5" gutterBottom>
        SIGNUP FORM
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) => {
          console.log(values);
          formikHelpers.resetForm();
        }}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Email"
                  fullWidth
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^a-zA-Z0-9._%+-@]/g,
                      ""
                    );
                  }}
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={Boolean(touched.email) && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="name"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Name"
                  fullWidth
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  helperText={Boolean(touched.name) && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Password"
                  fullWidth
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="confirmpassword"
                  type="password"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Confirm Password"
                  fullWidth
                  error={
                    Boolean(errors.confirmpassword) &&
                    Boolean(touched.confirmpassword)
                  }
                  helperText={
                    Boolean(touched.confirmpassword) && errors.confirmpassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="address"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Address"
                  fullWidth
                  error={Boolean(errors.address) && Boolean(touched.address)}
                  helperText={Boolean(touched.address) && errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="phoneNumber"
                  type="tel"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Phone Number"
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  error={
                    Boolean(errors.phoneNumber) && Boolean(touched.phoneNumber)
                  }
                  helperText={
                    Boolean(touched.phoneNumber) && errors.phoneNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!isValid || !dirty}
                  fullWidth
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default MaterialForm;
