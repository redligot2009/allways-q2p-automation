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
import ReorderRoundedIcon from '@material-ui/icons/ReorderRounded';

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

const RequestForQuotation = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          mt={1}
          display="flex"
          alignItems="center"
        >
          <Grid
              container
              justify="space-between"
              spacing={3}
              className={classes.media}
          >
              <Grid container justify="center">
                  <Avatar className={classes.avatar}>
                      <ReorderRoundedIcon />
                  </Avatar>
              </Grid>
              <Grid item xs>
                  <Typography
                      color="textSecondary"
                      gutterBottom
                      align="center"
                      variant="h4"
                  >
                  REQUEST FOR QUOTATION
                  </Typography>
                  <Typography
                      color="textSecondary"
                      variant="body1"
                      align="center"
                  >
                      Fill up a request for quotation for your next project
                  </Typography>
              </Grid>
          </Grid>
          <Box
            mt={2}
            display="flex"
            alignItems="center"
          >
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

RequestForQuotation.propTypes = {
  className: PropTypes.string
};

export default RequestForQuotation;