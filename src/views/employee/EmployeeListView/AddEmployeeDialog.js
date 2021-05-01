import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  TextField
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { AddBoxOutlined } from '@material-ui/icons';
import { getJobPosition } from "../../../_helpers"
import { createNewEmployee } from "../../../_actions/users"

import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, FieldArray, getIn } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const AddEmployeeDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Dialog open={props.openAddEmployeeDialog} onClose={props.handleCloseAddEmployeeDialog} fullWidth={true} maxWidth = {'sm'}>
      {/* <DialogTitle>HELLO WORLD</DialogTitle> */}
      <DialogContent>
        <Formik
          enableReinitialize={true}
          initialValues={{
              "username": "",
              "email": "placeholder.email@gmail.com",
              "first_name": "",
              "middle_name": "",
              "last_name": "",
              "mobile_number": "",
              "shipping_address": "",
              "organization_name": "",
              "job_position": props.employeeType,
              "plate_number": "",
              "license_number": "",
          }}
          validationSchema={
            Yup.object().shape({
              username: Yup.string().required('Username is required'),
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              mobile_number: Yup.string().required('Mobile number is required').min(10, "Must be a valid phone number"),
              first_name: Yup.string().max(255).required('First name is required'),
              middle_name: Yup.string().max(255),
              last_name: Yup.string().max(255).required('Last name is required'),
              // TODO: Mimic Django password validation behavior
              password: Yup.string()
                        .max(255)
                        .required('Password is required')
                        .matches(
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          `Must contain: 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character.`
                        )
            })
          }
          onSubmit={(values,actions)=>{
            dispatch(createNewEmployee(values))
              .then((response)=>{
                toast.success("New employee successfully created!");
                props.setOpenAddEmployeeDialog(false)
              })
              .catch((error)=>{
                // console.log("What the fuck is this", values)
                toast.error("Inputted employee details are invalid or user already exists.");
              })
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
                <Typography
                  className={classes.name}
                  color="textSecondary"
                  variant="h3"
                >
                  Add {getJobPosition(props.employeeType)} Account
                </Typography>
                <Typography
                  className={classes.name}
                  color="textSecondary"
                  variant="h5"
                >
                  Account Credentials
                </Typography>
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
                <Typography
                  className={classes.name}
                  color="textSecondary"
                  variant="h5"
                >
                  Employee Basic Information
                </Typography>
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
                <Typography
                  className={classes.name}
                  color="textSecondary"
                  variant="h5"
                >
                  Employee Contact Information
                </Typography>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
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
                {props.employeeType !== 'O' && props.employeeType !== 'AM' && 
                (
                  <>
                    <Typography
                      className={classes.name}
                      color="textSecondary"
                      variant="h5"
                    >
                      {getJobPosition(props.employeeType)} Details
                    </Typography>
                    {()=>{
                      switch(props.employeeType)
                      {
                        case 'O':
                          return <></>
                        case 'AM':
                          return <></>
                        case 'P':
                          return <></>
                        case 'D':
                          return <></>
                        default:
                          return <></>
                      }
                    }}
                  </>
                )}
                
                <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="button"
                    variant="outlined"
                    onClick={handleSubmit}
                    // onClick={handleSubmit}
                >
                  Create Account
                </Button>
              </form>
            )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
export default AddEmployeeDialog;