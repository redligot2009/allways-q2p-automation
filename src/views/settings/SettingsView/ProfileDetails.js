import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

import { Formik, Form, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  // const [values, setValues] = useState({
  //   first_name: 'Ian Red',
  //   middle_name: 'D',
  //   last_name: 'Ligot',
  //   email: 'testemail@gmail.com',
  //   mobile_number: '1234567890',
  //   shipping_address: 'Project 4, Quezon City',
  //   organization_name: 'Ateneo de Manila University',
  //   job_position: 'Client',
  // });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        first_name: 'Ian Red',
        middle_name: 'D',
        last_name: 'Ligot',
        email: 'testemail@gmail.com',
        mobile_number: '1234567890',
        shipping_address: 'Project 4, Quezon City',
        organization_name: 'Ateneo de Manila University',
        job_position: 'Client',
      }}
      onSubmit={(values,actions)=>{
        
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          mobile_number: Yup.string().required('Mobile number is required').min(10, "Must be a valid phone number"),
          first_name: Yup.string().max(255).required('First name is required'),
          middle_name: Yup.string().max(255),
          last_name: Yup.string().max(255).required('Last name is required'),
          shipping_address: Yup.string().max(255),
        })
      }
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
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Card>
            <CardHeader
              subheader="Update your account information below"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={4}
                  xs={12}
                >
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
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
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
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
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
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.mobile_number && errors.mobile_number)}
                    fullWidth
                    helperText={touched.mobile_number && errors.mobile_number}
                    label="Mobile number"
                    margin="normal"
                    name="mobile_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobile_number}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.shipping_address && errors.shipping_address)}
                    fullWidth
                    helperText={touched.shipping_address && errors.shipping_address}
                    label="Shipping address"
                    margin="normal"
                    name="shipping_address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shipping_address}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              p={2}
            >
              <Button
                color="primary"
                variant="contained"
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
