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

import JobOrderCard from '../../../../jobOrders/JobOrderCard';

const InProduction = (props) => {
    return (props.in_production && 
      <Grid item xs={12} sm={6}>
        <Box mb={1}>
          <Typography className={props.classes.name}
            color="textSecondary"
            variant="h5"
          >
            IN PRODUCTION
          </Typography>
        </Box>
        <Grid container style={{maxHeight:480,overflow:'auto'}}>
          {props.in_production ? 
          props.in_production.map((jobOrder) => (
            <Grid
              item xs={12}
              key={jobOrder.id}
            >
              <Box mt={2}>
                {jobOrder && 
                  <JobOrderCard
                    className={props.classes.JobOrderCard}
                    jobOrder={jobOrder}
                  />
                }
              </Box>
            </Grid>
        )) : null}
        </Grid>
      </Grid>
    );
}
export default InProduction;