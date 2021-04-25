import React, { useState, useEffect } from 'react';

import { useSelector } from "react-redux";
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

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >

      <Container maxWidth={false}>
      <Box mb={2}>
      <Typography className={classes.name}
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
            <Link to={'/'}>
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
          <Typography className={classes.name}
          color="textPrimary"
          variant="h2"
          >
          Overview of Orders
          </Typography>
          </Box>
          <Grid
            item
            
          >
          <Typography className={classes.name}
          color="textSecondary"
          variant="h5"
          >
          AWAITING APPROVAL
          </Typography>
          {data.in_progress.map((quotation) => (
                  <Grid
                    item
                    key={quotation.id}
                    lg={12}
                    md={6}
                    xs={12}
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
          <Grid
            item

          >
          <Typography className={classes.name}
          color="textSecondary"
          variant="h5"
          >
          IN PRODUCTION
          </Typography>
          {/* {products.map((product) => (
                  <Grid
                    item
                    key={product.id}
                    lg={12}
                    md={6}
                    xs={12}
                  >
                    <Box mt={2}>
                    <ProductCard
                      className={classes.productCard}
                      product={product}
                    />
                    </Box>
                  </Grid>
                ))} */}
          </Grid>
          <Grid
            item
            
          >
          <Typography className={classes.name}
          color="textSecondary"
          variant="h5"
          >
          OUT FOR DELIVERY
          </Typography>
          {data.computed.map((quotation) => (
                    <Grid
                      item
                      key={quotation.id}
                      lg={12}
                      md={6}
                      xs={12}
                    >
                      <Box mt={2}>
                      <QuotationCardComputed
                        className={classes.QuotationCard}
                        quotation={quotation}
                      />
                      </Box>
                    </Grid>
                  ))}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
