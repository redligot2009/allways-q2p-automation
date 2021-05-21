import React, { useState, useEffect } from 'react';
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
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../_actions/auth'
import axios from 'axios';
const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, currentUserProfile, fetchData, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  useEffect(()=>{
    return ()=>{
      source.cancel();
    }
  })
  return (currentUserProfile ?
    <Formik
      enableReinitialize={true}
      initialValues={currentUserProfile}
      onSubmit={(values,actions)=>{
        dispatch(updateProfile(values.user,values,source.token))
        .then((response)=>{
          fetchData()
          console.log("SUCCESS")
        })
        .catch((error)=>{
          console.log(error)
          console.log(values);
        })
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
      }) => (currentUserProfile &&
        <form
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
                onClick={handleSubmit}
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>:
      <>
        <ClipLoader loading={true} size={50} />
      </>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
