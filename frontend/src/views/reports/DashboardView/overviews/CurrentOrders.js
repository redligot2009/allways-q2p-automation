import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate, useHistory, Link } from 'react-router-dom';

import {
  Container,
  Grid,
  makeStyles,
  Box,
  Button,
  Typography
} from '@material-ui/core';

import JobOrderCard from '../cards/JobOrderCard';

const CurrentOrders = (props) => {
    return (
    <Grid item xs={12} sm={6}>
        <Box mb={1}>
          <Typography className={props.classes.name}
            color="textSecondary"
            variant="h5"
          >
            CURRENT ORDERS
          </Typography>
        </Box>
        <Grid container style={{maxHeight:480,overflow:'auto'}}>
          {props.in_production && props.in_production.map((jobOrder) => (
            <Grid
              item
              key={jobOrder.id}
            >
              <Box mt={2}>
                <JobOrderCard
                    className={props.classes.JobOrderCard}
                    jobOrder={jobOrder}
                />
              </Box>
            </Grid>
        ))}
        </Grid>
    </Grid>
    );
}
export default CurrentOrders;