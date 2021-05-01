import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProductCard from './ProductCard';
import ProductCardDelivery from './ProductCardDelivery';
import ProductCardProd from './ProductCardProd';
import QuotationCardComputed from '../../quotations/QuotationCardComputed';
import JobOrderCard from '../../jobOrders/JobOrderCard';
import data from './data';

import { getComputedQuotations, updateQuotation, getQuotationById, approveQuotation, getInProgressQuotations } from "../../../_actions/quotation";
import { getInProductionJobOrders, getPendingJobOrders } from '../../../_actions/jobOrder';
import { useInterval } from "../../../_helpers/hooks"
import { limitVisibility } from "../../../_helpers/";
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

const ProductList = () => {
  const classes = useStyles();
  const [products] = useState(data);

  const dispatch = useDispatch();

  const {profile : currentUserProfile} = useSelector(state=>state.auth)
  const { inProgressQuotations } = useSelector (state=>state.quotation);
  const { computedQuotations } = useSelector(state=>state.quotation);
  const { pendingJobOrders } = useSelector(state=>state.jobOrder)
  const { inProgressJobOrders } = useSelector(state=>state.jobOrder);
  const { outForDeliveryJobOrders } = useSelector(state=>state.jobOrder)
  const { currentQuotation } = useSelector(state=>state.quotation);

  const [initialFetchDataFinished, setInitialFetchDataFinished]  = useState(false);
  
  const isUserClient = () => {
    switch(currentUserProfile.job_position)
    {
      case "":
        return true;
      case null:
        return true;
      default:
        return false;
    }
  }

  async function fetchData () {
    await dispatch(getProfile())
    switch(currentUserProfile.job_position)
    {
      case 'O':
        await dispatch(getPendingJobOrders())
        await dispatch(getInProductionJobOrders())
        break;
      case 'AM':
        await dispatch(getPendingJobOrders())
        await dispatch(getInProductionJobOrders())
        break;
      case 'P':
        break;
      case 'D':
        break;
      default:
        await dispatch(getInProgressQuotations(currentUserProfile.id))
        await dispatch(getComputedQuotations(currentUserProfile.id))
        await dispatch(getInProductionJobOrders(currentUserProfile.id))
    }
    
  }

  useEffect(()=>{
    async function initialFetchData () {
      try
      {
        await fetchData()
        setInitialFetchDataFinished(true);
      }
      catch(error)
      {
        console.log(error)
      }
    }
    initialFetchData();
  },[])

  useInterval(()=>{
    async function reFetchData (){
      // console.log(currentUserProfile)
      try
      {
        await fetchData()
      }
      catch(error)
      {
        console.log(error)
      }
      // console.log(computedQuotations)
    }
    reFetchData()
  },2000);


  return (
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
        {initialFetchDataFinished && currentUserProfile && 
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
              {inProgressQuotations && inProgressQuotations.map((quotation) => (
                <Grid
                  item
                  key={quotation.id}
                >
                  <Box mt={2}>
                  <QuotationCardComputed
                    className={classes.productCard}
                    quotation={quotation}
                    fetchData={fetchData}
                  />
                  </Box>
                </Grid>
              ))}
            </Box>
          </Grid>,
          ['C'], 
          currentUserProfile.job_position
          )}
          {initialFetchDataFinished && currentUserProfile && 
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
              {computedQuotations && computedQuotations.map((quotation) => (
                <Grid
                  item
                  key={quotation.id}
                >
                  <Box mt={2}>
                  <QuotationCardComputed
                    className={classes.productCard}
                    quotation={quotation}
                    fetchData={fetchData}
                  />
                  </Box>
                </Grid>
              ))}
            </Box>
          </Grid>,
          ['C'], 
          currentUserProfile.job_position
          )}
          {initialFetchDataFinished && currentUserProfile && 
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
              {pendingJobOrders && pendingJobOrders.map((jobOrder) => (
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
          {limitVisibility(
            <Grid item xs={12} md={4}>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                In Production
              </Typography>
              <Box mt={2}>
                {initialFetchDataFinished && inProgressJobOrders && inProgressJobOrders.map((jobOrder) => (
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
            ['D'],
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
                  {initialFetchDataFinished && outForDeliveryJobOrders && outForDeliveryJobOrders.map((jobOrder) => (
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

export default ProductList;