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

import Page from 'src/components/Page';

// BUTTONS
import QuoteReview from './buttons/QuoteReview';
import ManageEmployees from './buttons/ManageEmployees';
import OrderTracking from './buttons/OrderTracking';
import AccountSettings from './buttons/AccountSettings';
import RequestForQuotation from './buttons/RequestForQuotation';

// CARDS
import QuotationCard from './cards/QuotationCard';

// QUOTATION-RELATED LISTS
import AwaitingComputation from './overviews/quotations/AwaitingComputation';
import AwaitingApproval from './overviews/quotations/AwaitingApproval';

// JOB ORDER RELATED LISTS
import CurrentOrders from './overviews/CurrentOrders';
import InProduction from './overviews/jobOrders/InProduction';
import OutForDelivery from './overviews/jobOrders/OutForDelivery';

import {getComputedQuotations, getInProgressQuotations} 
from '../../../_actions/quotation';

import {getInProductionJobOrders, getPendingJobOrders} 
from '../../../_actions/jobOrder';

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
  
  const {computedQuotations : computed} = useSelector(state => state.quotation);
  const {inProgressQuotations: in_progress} = useSelector(state=>state.quotation);
  const {inProgressJobOrders : in_production} = useSelector(state=>state.jobOrder);
  const {outForDeliveryJobOrders : out_for_delivery} = useSelector(state=>state.jobOrder);
  const {finishedJobOrders : finished } = useSelector(state=>state.jobOrder);

  useEffect(()=>{
    async function fetchData() {
      await dispatch(getComputedQuotations())
      await dispatch(getInProgressQuotations())
      await dispatch(getInProductionJobOrders())
      await dispatch(getPendingJobOrders())
    }
    fetchData();
  },[])

  const limitVisibility = (element, roles, exclude=false) => {
    if(exclude===false)
    {
      if(roles.includes(currentUserProfile.job_position))
      {
        return element;
      }
    }
    else
    {
      if(!(roles.includes(currentUserProfile.job_position)))
      {
        return element;
      }
    }
    return <></>
  }

  return (currentUserProfile && 
    <Page
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
                ['O','AM']
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
                ['O','AM','P','D'], true
              )}

              {limitVisibility(
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Link to={'/app/employees/'}>
                    <ManageEmployees />
                  </Link>
                </Grid>,
                ['O','AM']
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
                    <AwaitingComputation
                      classes={classes}
                      in_progress={in_progress}
                    />
                    <AwaitingApproval
                      classes={classes}
                      computed={computed}
                    />
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
                      <InProduction
                        classes={classes}
                        in_production={in_production}
                      />
                      
                      <OutForDelivery
                        classes={classes}
                        out_for_delivery={out_for_delivery}
                      />
                    </Grid>
                  </Box>
                </Box>,
                ['O','AM']
              )}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
