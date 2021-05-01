import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import SyncAltSharpIcon from '@material-ui/icons/SyncAltSharp';

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

const TasksProgress = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>

        <Grid
          container
          justify="center"
          spacing={3}
          className={classes.media}
        >
        <Grid container justify="center">
            <Avatar className={classes.avatar}>
              <SyncAltSharpIcon />
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
              Follow the status of your orders from production to delivery
            </Typography>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
        </Box>
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;