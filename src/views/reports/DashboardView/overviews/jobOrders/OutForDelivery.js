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

const OutForDelivery = (props) => {
    return (props.out_for_delivery &&
    <Grid item xs={12} sm={6}>
        <Box mb={1}>
          <Typography className={props.classes.name}
            color="textSecondary"
            variant="h5"
          >
            OUT FOR DELIVERY
          </Typography>
        </Box>
        <Grid container style={{maxHeight:480,overflow:'auto'}}>
          {props.out_for_delivery && props.out_for_delivery.map((jobOrder) => (
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
export default OutForDelivery;