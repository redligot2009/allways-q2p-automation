import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.grey[600],
    height: 56,
    width: 56
  },
  media: {
    paddingTop: "7%"
  }
}));

const OrderTracking = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>

        <Grid
          container
          justify="space-between"
          spacing={3}
          className={classes.media}
        >
        <Grid container justify="center">
            <Avatar className={classes.avatar}>
              <SyncAltIcon />
            </Avatar>
        </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              align="center"
              variant="h4"
            >
              TRACK ORDERS
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              align="center"
            >
              Keep note of all orders that are moving in production to delivery
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

OrderTracking.propTypes = {
  className: PropTypes.string
};

export default OrderTracking;