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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';

const useStyles = makeStyles((theme) => ({
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

const Budget = ({ className, ...rest }) => {
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
              <ViewCarouselIcon />
            </Avatar>
        </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              align="center"
              variant="h4"
            >
              ORDER PRODUCTS
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              align="center"
            >
              Approve quotations of orders, file job orders for production
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

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;