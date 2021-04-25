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
import Budget from './Budget';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import QuotationCard from './QuotationCard';
import data from  './data';
import QuotationCardComputed from './QuotationCardComputed';
import ProductCard from './ProductCard';

import {getComputedQuotations, getInProgressQuotations} from '../../../_actions/quotation';

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

  useEffect(()=>{
    async function fetchData() {
      await dispatch(getComputedQuotations())
      await dispatch(getInProgressQuotations())
    }
    fetchData();
  },[])

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
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Link to={'/app/quote/review/'}>
                  <Budget />
                </Link>
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Link to={'/app/tracking/account_manager'}>
                  <TotalCustomers />
                </Link>
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Link to={'/app/employees/'}>
                  <TasksProgress />
                </Link>
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Link to={'/app/settings'}>
                  <TotalProfit />
                </Link>
              </Grid>
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
                  <Grid item xs={12} sm={6}>
                    <Box mb={1}>
                      <Typography className={classes.name}
                        color="textSecondary"
                        variant="h5"
                      >
                        AWAITING COMPUTATION
                      </Typography>
                    </Box>
                    <Grid container style={{maxHeight:480,overflow:'auto'}}>
                      {in_progress && in_progress.map((quotation) => (
                        <Grid
                          item
                          key={quotation.id}
                        >
                          <Box mt={2}>
                          <QuotationCard
                            className={classes.QuotationCard}
                            quotation={quotation}
                          />
                          </Box>
                        </Grid>
                    ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={1}>
                      <Typography className={classes.name}
                        color="textSecondary"
                        variant="h5"
                      >
                        AWAITING APPROVAL
                      </Typography>
                    </Box>
                    <Grid container style={{maxHeight:480,overflow:'auto'}}>
                      {computed && computed.map((quotation) => (
                        <Grid
                          item
                          key={quotation.id}
                        >
                          <Box mt={2}>
                          <QuotationCard
                            className={classes.QuotationCard}
                            quotation={quotation}
                          />
                          </Box>
                        </Grid>
                    ))}
                  </Grid>
                </Grid>
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
                  <Grid item xs={12} sm={6}>
                    <Box mb={1}>
                      <Typography className={classes.name}
                        color="textSecondary"
                        variant="h5"
                      >
                        IN PRODUCTION
                      </Typography>
                    </Box>
                    <Grid container style={{maxHeight:480,overflow:'auto'}}>
                      
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={1}>
                      <Typography className={classes.name}
                        color="textSecondary"
                        variant="h5"
                      >
                        OUT FOR DELIVERY
                      </Typography>
                    </Box>
                    <Grid container style={{maxHeight:480,overflow:'auto'}}>
                      
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
