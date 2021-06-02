import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Link as RouterLink, useNavigate, useHistory, useLocation, Link } from 'react-router-dom';

import {
  Container,
  Grid,
  makeStyles,
  Box,
  Button,
  Typography
} from '@material-ui/core';

import Page from 'src/components/Page';

// BUTTONS
import QuoteReview from './buttons/QuoteReview';
import ManageEmployees from './buttons/ManageEmployees';
import OrderTracking from './buttons/OrderTracking';
import AccountSettings from './buttons/AccountSettings';
import RequestForQuotation from './buttons/RequestForQuotation';

// QUOTATION-RELATED LISTS
import AwaitingComputation from './overviews/quotations/AwaitingComputation';
import AwaitingApproval from './overviews/quotations/AwaitingApproval';

// JOB ORDER RELATED LISTS
import CurrentOrders from './overviews/CurrentOrders';
import InProduction from './overviews/jobOrders/InProduction';
import OutForDelivery from './overviews/jobOrders/OutForDelivery';

import {getComputedQuotations, getInProgressQuotations} 
from '../../../_actions/quotation';

import {logout, getProfile}
from '../../../_actions/auth';

import {getInProductionJobOrders, getPendingJobOrders} 
from '../../../_actions/jobOrder';

import {limitVisibility}
from '../../../_helpers/';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Dashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState({in_progress:[],computed:[]});
  const [products] = useState(data);
  const { profile : currentUserProfile } = useSelector(state => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const {computedQuotations : computed} = useSelector(state => state.quotation);
  const {inProgressQuotations: in_progress} = useSelector(state=>state.quotation);
  const {inProgressJobOrders : in_production} = useSelector(state=>state.jobOrder);
  const {outForDeliveryJobOrders : out_for_delivery} = useSelector(state=>state.jobOrder);
  const {finishedJobOrders : finished } = useSelector(state=>state.jobOrder);
  const source = axios.CancelToken.source()

  async function fetchData (dispatch) {
    try
    {
      if(currentUserProfile)
      {
        switch(currentUserProfile.job_position)
        {
          case 'O':
            dispatch(getComputedQuotations("",source.token));
            dispatch(getInProgressQuotations("",source.token));
            // dispatch(getApprovedQuotations("",source.token))
            dispatch(getPendingJobOrders("","",source.token))
            dispatch(getInProductionJobOrders("","",source.token))
            // dispatch(getOutForDeliveryJobOrders("","",source.token))
            // dispatch(getFinishedJobOrders("","",source.token))
            break;
          case 'AM':
            dispatch(getComputedQuotations("",source.token));
            dispatch(getInProgressQuotations("",source.token));
            // dispatch(getApprovedQuotations("",source.token))
            dispatch(getPendingJobOrders("","",source.token))
            dispatch(getInProductionJobOrders("","",source.token))
            // dispatch(getOutForDeliveryJobOrders("","",source.token))
            // dispatch(getFinishedJobOrders("","",source.token))
            break;
          case 'P':
            // dispatch(getInProductionJobOrders("","",source.token))
            break;
          case 'D':
            // dispatch(getOutForDeliveryJobOrders("","",source.token))
            break;
          default:
            dispatch(getPendingJobOrders(currentUserProfile.id,"",source.token))
            dispatch(getInProgressQuotations(currentUserProfile.id,source.token))
            dispatch(getComputedQuotations(currentUserProfile.id,source.token))
            dispatch(getInProductionJobOrders(currentUserProfile.id,"",source.token))
            
        }
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }
  useEffect(()=>{
    dispatch(getProfile())
    return () => {
      source.cancel();
    }
  },[])
  
  useEffect(()=>{
    fetchData(dispatch);
    if(currentUserProfile === null)
    {
      dispatch(logout())
    }
    return () => {
      source.cancel();
    }
  },[dispatch, location.key])
  /*
  const { profile: currentUserProfile } = useSelector((state) => state.auth)
  const source = axios.CancelToken.source()

  useEffect(()=>{
    async function fetchProfile () {
      await dispatch(getProfile(source.token))
      .then((response)=>{
        if(currentUserProfile === null)
        {
          dispatch(logout())
        }
      })
      .catch((error)=>{
        
      })
    }
    fetchProfile();
    return () => {
      source.cancel();
    }
  },[])
   */
  return (currentUserProfile ? 
    (<Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Box mb={2}>
          <Typography 
            className={classes.name}
            color="textPrimary"
            variant="h2"
          >
            Hello {currentUserProfile.full_name}! What would you like to do today?
          </Typography>
          </Box>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {limitVisibility(
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Link to={'/app/quote/review/'}>
                    <QuoteReview />
                  </Link>
                </Grid>,
                ['O','AM'],
                currentUserProfile.job_position
              )}
              
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Link to={`/app/tracking/`}>
                  <OrderTracking />
                </Link>
              </Grid>

              {limitVisibility(
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Link to={'/app/products'}>
                    <RequestForQuotation />
                  </Link>
                </Grid>,
                ['C'],
                currentUserProfile.job_position
              )}

              {limitVisibility(
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Link to={'/app/employees/'}>
                    <ManageEmployees />
                  </Link>
                </Grid>,
                ['O','AM'],
                currentUserProfile.job_position
              )}
              
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Link to={'/app/settings'}>
                  <AccountSettings />
                </Link>
              </Grid>
              
              {limitVisibility(
                <Box ml={1} width={1} height={1}>
                  <Box my={2}>
                    <Typography 
                      className={classes.name}
                      color="textPrimary"
                      variant="h2"
                      mb={3}
                    >
                      Overview of Quotes
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    {
                      in_progress && 
                      <AwaitingComputation
                        classes={classes}
                        in_progress={in_progress}
                      />
                    }
                    {computed && 
                    <AwaitingApproval
                      classes={classes}
                      computed={computed}
                    />
                    }
                  </Grid>
                  <Box ml={1} width={1} height={1}>
                    <Box my={2}>
                      <Typography 
                        className={classes.name}
                        color="textPrimary"
                        variant="h2"
                        mb={3}
                      >
                        Overview of Job Orders
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                      {
                        in_production &&
                        <InProduction
                          classes={classes}
                          in_production={in_production}
                        />
                      }
                      {
                        out_for_delivery && 
                        <OutForDelivery
                          classes={classes}
                          out_for_delivery={out_for_delivery}
                        />
                      }
                      
                    </Grid>
                  </Box>
                </Box>,
                ['O','AM'],
                currentUserProfile.job_position
              )}
        </Grid>
      </Container>
    </Page>) :
    <>
      <ClipLoader loading={true} size={150} />
    </>
  );
};

export default Dashboard;
