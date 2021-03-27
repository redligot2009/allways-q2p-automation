import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../_actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        overflow="auto"
        height="100%"
      >
        <Container 
          maxWidth="sm"
        >
          <Formik
            initialValues={{
              username: '',
              email: '',
              first_name: '',
              middle_name: '',
              last_name: '',
              password: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                username: Yup.string().required('Username is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                first_name: Yup.string().max(255),
                middle_name: Yup.string().max(255),
                last_name: Yup.string().max(255),
                password: Yup.string().max(255).required('Password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(values, actions) => {
              // console.log("YO BOY!");
              dispatch(
                register( values.username,
                          values.email,
                          values.password,
                          values.first_name,
                          values.middle_name,
                          values.last_name))
                .then(()=>{
                  navigate('/app/dashboard', { replace: true });
                })
                .catch((error)=>{
                  actions.setSubmitting(false);
                  console.log("NOPE! " + error);
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form 
                onSubmit={handleSubmit}
              >
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.first_name && errors.first_name)}
                  fullWidth
                  helperText={touched.first_name && errors.first_name}
                  label="First name"
                  margin="normal"
                  name="first_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.middle_name && errors.middle_name)}
                  fullWidth
                  helperText={touched.middle_name && errors.middle_name}
                  label="Middle name"
                  margin="normal"
                  name="middle_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.middle_name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.last_name && errors.last_name)}
                  fullWidth
                  helperText={touched.last_name && errors.last_name}
                  label="Last name"
                  margin="normal"
                  name="last_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
