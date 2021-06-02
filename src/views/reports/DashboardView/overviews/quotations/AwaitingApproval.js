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

import QuotationCard from '../../../../quotations/QuotationCard';

const AwaitingApproval = (props) => {
    return (
        <Grid item xs={12} sm={6}>
            <Box mb={1}>
              <Typography className={props.classes.name}
                color="textSecondary"
                variant="h5"
              >
                AWAITING APPROVAL
              </Typography>
            </Box>
            <Grid container style={{maxHeight:480,overflow:'auto'}}>
              {props.computed ? (props.computed.map((quotation) => (
                <Grid
                  item
                  key={quotation.id}
                >
                  <Box mt={2}>
                  <QuotationCard
                    className={props.classes.QuotationCard}
                    quotation={quotation}
                  />
                  </Box>
                </Grid>
            ))): null}
            </Grid>
        </Grid>
    );
}
export default AwaitingApproval;