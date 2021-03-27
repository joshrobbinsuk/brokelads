import React from "react";
import { Formik, useField } from "formik";
import { Button, Typography, TextField, FormControl } from "@material-ui/core";
import * as Yup from "yup";

const FormikTextField = (props) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && meta.error ? true : false}
      helperText={meta.touched && meta.error ? meta.error : null}
    />
  );
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(3),
  password: Yup.string().required().min(3),
});

const AuthForm = ({ title, handleSubmit }) => {
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <Typography variant="overline" component="h2">
              {title}
            </Typography>
            <FormControl>
              <FormikTextField name="username" placeholder="username" />
              <FormikTextField
                name="password"
                placeholder="password"
                type="password"
              />
              <Button onClick={handleSubmit} color="primary">
                Submit
              </Button>
            </FormControl>
          </>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
