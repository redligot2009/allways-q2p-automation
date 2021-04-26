import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
  Box
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

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

const TotalProfit = ({ className, ...rest }) => {
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
              <SettingsIcon />
            </Avatar>
        </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              align="center"
              variant="h4"
            >
              ADJUST SETTINGS
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              align="center"
            >
              Change your password and other account details
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

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;