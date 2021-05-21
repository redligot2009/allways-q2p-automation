import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  first_name: 'Ian Red',
  middle_name: 'D',
  last_name: 'Ligot',
  email: 'testemail@gmail.com',
  mobile_number: '1234567890',
  shipping_address: 'Project 4, Quezon City',
  organization_name: 'Ateneo de Manila University',
  job_position: 'Client',
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, currentUserProfile, ...rest }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.first_name + " " + user.middle_name + " " + user.last_name}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
          >
            {user.organization_name}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
          >
            {user.job_position}
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
