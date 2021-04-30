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
  makeStyles
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { AddBoxOutlined } from '@material-ui/icons';
import { getJobPosition } from "../../../_helpers"

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

const EmployeeCard = ({ className, employee, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          >
        <Avatar
          style={{marginRight: 12}}
        ></Avatar>
        <Box
          display="flex"
          flexDirection="column"
        >
            <Typography
            align="left"
            color="textPrimary"
            variant="h4"
            >
              {employee.full_name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              align="bottom"
            >
              {getJobPosition(employee.job_position)}
            </Typography>
        </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

EmployeeCard.propTypes = {
  className: PropTypes.string,
  employee: PropTypes.object.isRequired
};

export default EmployeeCard;
