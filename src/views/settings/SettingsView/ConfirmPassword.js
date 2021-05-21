import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {}
}));

const ConfirmPassword = ({ className, handleClose, handleSave, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Dialog open={false} onClose={handleClose} fullWidth={true} maxWidth = {'sm'}>
      <form
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="Confirm password"
            title="Password"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm password"
              margin="normal"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
              variant="outlined"
            />
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
              Update Password
            </Button>
          </Box>
        </Card>
      </form>
    </Dialog>
  );
};

ConfirmPassword.propTypes = {
  className: PropTypes.string
};

export default ConfirmPassword;
