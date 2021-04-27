import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import QuotationCard from './QuotationCard';
import QuotationCardComputed from './QuotationCardComputed';
// import data from './data';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {getComputedQuotations, getInProgressQuotations} from "../../../_actions/quotation";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  quotationCard: {
    height: '100%'
  }
}));

const QuotationReviewList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {computedQuotations: computed} = useSelector((state)=>state.quotation);
  const {inProgressQuotations: in_progress} = useSelector((state)=>state.quotation);
  
  useEffect(() => {
    async function fetchData(){
      try
      {
        await dispatch(getComputedQuotations());
        await dispatch(getInProgressQuotations());
        console.log(in_progress);
        console.log(computed);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    fetchData();
  }, [computed, in_progress])

  return (
    <Page
      className={classes.root}
      title="Quote Review"
    >
      <Container maxWidth={false}>
        <Typography className={classes.name} color="textPrimary" variant="h2">
          Quote Review
        </Typography>
        <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.name} color="textSecondary" variant="h5">
              Awaiting Computation
            </Typography>
              <Box mt={2}>
                {in_progress ? in_progress.map((quotation) => (
                  <Grid item key={quotation.id} lg={12} md={12} xs={12}>
                    <Box mt={2}>
                      <QuotationCard 
                        className={classes.quotationCard} 
                        quotation={quotation}
                      />
                    </Box>
                  </Grid>
                )) : null}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.name} color="textSecondary" variant="h5">
                Awaiting Approval
              </Typography>
                <Box mt={2}>
                  {computed ? computed.map((quotation) => (
                    <Grid item key={quotation.id} lg={12} md={12} xs={12}>
                      <Box mt={2}>
                        <QuotationCardComputed
                          className={classes.quotationCard}
                          quotation={quotation}
                        />
                      </Box>
                    </Grid>
                  )) : null}
                </Box>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </Page>
  );
};

export default QuotationReviewList;
