import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import QuotationCardComputed from '../../quotations/QuotationCardComputed';
import JobOrderCard from '../../jobOrders/JobOrderCard';
import data from './data';

import { getComputedQuotations, updateQuotation, getQuotationById, approveQuotation, getInProgressQuotations } from "../../../_actions/quotation";
import { getInProductionJobOrders, getPendingJobOrders } from '../../../_actions/jobOrder';
import { useInterval } from "../../../_helpers/hooks"
import { limitVisibility } from "../../../_helpers";
import { getProfile } from "../../../_actions/auth";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  JobOrderCard: {
    height: '100%'
  }
}));
// TODO: Implement "ViewOrder.js" page
// This is basically a simplified and non-interactable version of the Quote Review detail page

const OrderTrackingList = () => {
  const classes = useStyles();
  const [products] = useState(data);

  const dispatch = useDispatch();
  const source = axios.CancelToken.source()

  const {profile : currentUserProfile} = useSelector(state=>state.auth)
  const { inProgressQuotations } = useSelector (state=>state.quotation);
  const { computedQuotations } = useSelector(state=>state.quotation);
  const { pendingJobOrders } = useSelector(state=>state.jobOrder)
  const { inProgressJobOrders } = useSelector(state=>state.jobOrder);
  const { outForDeliveryJobOrders } = useSelector(state=>state.jobOrder)
  const { currentQuotation } = useSelector(state=>state.quotation);

  const [initialFetchDataFinished, setInitialFetchDataFinished]  = useState(false);

  async function fetchData () {
    try
    {
      switch(currentUserProfile.job_position)
      {
        case 'O':
          dispatch(getPendingJobOrders(source.token))
          dispatch(getInProductionJobOrders("","",source.token))
          break;
        case 'AM':
          dispatch(getPendingJobOrders(source.token))
          dispatch(getInProductionJobOrders("","",source.token))
          break;
        case 'P':
          break;
        case 'D':
          break;
        default:
          dispatch(getInProgressQuotations(currentUserProfile.id,source.token))
          dispatch(getComputedQuotations(currentUserProfile.id,source.token))
          dispatch(getInProductionJobOrders(currentUserProfile.id,"",source.token))
      }
    }
    catch (error)
    {
      console.log(error)
    }
  }

  useEffect(()=>{
    async function initialFetchData () {
      await fetchData()
    }
    
    dispatch(getProfile())
    .then((response) =>
      {
        initialFetchData()
      }
    )
    .catch((error)=>{
      console.log("Error fetching user profile");
      source.cancel();
    })
    // console.log(inProgressQuotations)
    // console.log(computedQuotations)
    // console.log(inProgressJobOrders)
    // console.log(pendingJobOrders)
    // console.log(outForDeliveryJobOrders)
    return () => {
      source.cancel();
    }
  },[])

  useInterval(()=>{
    async function reFetchData (){
      // console.log(currentUserProfile)
      try
      {
        await fetchData()
        setInitialFetchDataFinished(true);
      }
      catch(error)
      {
        console.log(error)
        source.cancel();
      }
      // console.log(inProgressQuotations)
      // console.log(computedQuotations)
      // console.log(inProgressJobOrders)
      // console.log(pendingJobOrders)
      // console.log(outForDeliveryJobOrders)
    }
    reFetchData()
  },3000);


  return ( initialFetchDataFinished && currentUserProfile &&
    <Page
      className={classes.root}
      title="Order Tracking"
    >
      <Container maxWidth={false}>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h2"
        >
          Order Tracking
        </Typography>
        <Box mt={2}>
        <Grid container spacing={3}>
        {currentUserProfile && inProgressQuotations &&
          limitVisibility(
          <Grid item xs={12} md={4}>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              Awaiting Computation
            </Typography>
            <Box mt={2}>
              {inProgressQuotations && inProgressQuotations.map((quotation) => 
              (quotation && 
                <Grid
                  item
                  key={quotation.id}
                >
                  <Box mt={2}>
                  <QuotationCardComputed
                    className={classes.productCard}
                    quotation={quotation}
                  />
                  </Box>
                </Grid>
              ))}
            </Box>
          </Grid>,
          ['C'], 
          currentUserProfile.job_position
          )}
          {initialFetchDataFinished && currentUserProfile && computedQuotations &&
          limitVisibility(
          <Grid item xs={12} md={4}>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              Pending Approval
            </Typography>
            <Box mt={2}>
              {computedQuotations && computedQuotations.map((quotation) => 
              (quotation && 
                <Grid
                  item
                  key={quotation.id}
                >
                  <Box mt={2}>
                  <QuotationCardComputed
                    className={classes.productCard}
                    quotation={quotation}
                  />
                  </Box>
                </Grid>
              ))}
            </Box>
          </Grid>,
          ['C', 'AM', 'O'], 
          currentUserProfile.job_position
          )}
          {initialFetchDataFinished && currentUserProfile && pendingJobOrders &&
          limitVisibility(
          <Grid item xs={12} md={4}>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              Pending Job Orders
            </Typography>
            <Box mt={2}>
              {pendingJobOrders && pendingJobOrders.map((jobOrder) => 
              (jobOrder &&
                <Grid
                  item
                  key={jobOrder.id}
                >
                  <Box mt={2}>
                    <JobOrderCard
                      className={classes.JobOrderCard}
                      jobOrder={jobOrder}
                      currentUserProfile={currentUserProfile}
                    />
                  </Box>
                </Grid>
              ))}
            </Box>
          </Grid>,
          ['O','AM',],
          currentUserProfile.job_position,
          )}
          {initialFetchDataFinished && currentUserProfile && inProgressJobOrders && 
          limitVisibility(
            <Grid item xs={12} md={4}>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                In Production
              </Typography>
              <Box mt={2}>
                {inProgressJobOrders && inProgressJobOrders.map((jobOrder) => 
                (jobOrder &&
                  <Grid
                    item
                    key={jobOrder.id}
                  >
                    <Box mt={2}>
                      <JobOrderCard
                        jobOrder={jobOrder}
                        currentUserProfile={currentUserProfile}
                      />
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Grid>
            ,
            ['D','O','AM'],
            currentUserProfile.job_position
          )}
          
            <Grid item xs={12} md={4}>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                Out for Delivery
              </Typography>
                <Box mt={2}>
                  {initialFetchDataFinished && outForDeliveryJobOrders && currentUserProfile &&
                  outForDeliveryJobOrders.map((jobOrder) => 
                  (jobOrder &&
                    <Grid
                      item
                      key={jobOrder.id}
                    >
                      <Box mt={2}>
                        <JobOrderCard
                          jobOrder={jobOrder}
                          currentUserProfile={currentUserProfile}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </Page>
  );
};

export default OrderTrackingList;