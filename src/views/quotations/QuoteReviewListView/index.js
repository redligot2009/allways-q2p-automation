import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import QuotationCard from '../QuotationCard';
import QuotationCardComputed from '../QuotationCardComputed';
// import data from './data';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import {getComputedQuotations, getInProgressQuotations, getApprovedQuotations} from "../../../_actions/quotation";
import {useInterval} from "../../../_helpers/hooks";

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

  const { computedQuotations: computed} = useSelector((state)=>state.quotation);
  const { inProgressQuotations: in_progress} = useSelector((state)=>state.quotation);
  const { approvedQuotations : approved} = useSelector((state)=>state.quotation);
  const source = axios.CancelToken.source()
  // TODO: Do not make fetch if current fetch is still ongoing. Possibly remove useInterval and just call once instead.
  useInterval(() => {
    async function fetchData(){
      try
      {
        dispatch(getComputedQuotations("",source.token));
        dispatch(getInProgressQuotations("",source.token));
        dispatch(getApprovedQuotations("",source.token))
        // console.log(in_progress);
        // console.log(computed);
      }
      catch(error)
      {
        // console.log(error);
      }
    }
    fetchData();
  },3000)
  //computed, in_progress, approved
  useEffect(() => {
    return () => {
      source.cancel();
    }
  }, [])
  return ((in_progress && computed && approved)?
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
          <Grid item xs={12} sm={6} md={4}>
            <Typography className={classes.name} color="textSecondary" variant="h5">
              Awaiting Computation
            </Typography>
              <Box mt={2}>
                {in_progress ? in_progress.map((quotation) => (quotation &&
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
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.name} color="textSecondary" variant="h5">
                Awaiting Approval
              </Typography>
              <Box mt={2}>
                {computed ? computed.map((quotation) => (quotation &&
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
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.name} color="textSecondary" variant="h5">
                Approved
              </Typography>
              <Box mt={2}>
                {approved ? approved.map((quotation) => (quotation &&
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
    </Page>:
    <>
      <ClipLoader loading={true} size={150} />
    </>
  );
};

export default QuotationReviewList;
