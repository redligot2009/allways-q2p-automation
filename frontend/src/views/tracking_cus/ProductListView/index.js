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
import data from './data';

import { getComputedQuotations, updateQuotation, getQuotationById } from "../../../_actions/quotation";
import { getProfile } from "../../../_actions/auth";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
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
  const { computedQuotations } = useSelector(state=>state.quotation);
  const { currentQuotation } = useSelector(state=>state.quotation);
  
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
    await dispatch(getComputedQuotations(currentUserProfile.id))
  }

  function approveQuotation (quotationToUpdate) {
    dispatch(getQuotationById(quotationToUpdate.id))
    if(currentQuotation)
    {
      let updatedQuotation = currentQuotation;
      updatedQuotation.approval_status="approved";
      dispatch(updateQuotation(updatedQuotation));
    }
  }

  useEffect(()=>{
    async function initialFetchData (){
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
    initialFetchData()
  },[dispatch, currentUserProfile, computedQuotations])


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
                    approveQuotation={approveQuotation}
                  />
                  </Box>
                </Grid>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              In Production
            </Typography>
            <Box mt={2}>
              {products.map((product) => (
                <Grid
                  item
                  key={product.id}
                >
                  <Box mt={2}>
                  <ProductCard
                    className={classes.productCard}
                    product={product}
                  />
                  </Box>
                </Grid>
              ))}
            </Box>
          </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                Out for Delivery
              </Typography>
                <Box mt={2}>
                  {products.map((product) => (
                    <Grid
                      item
                      key={product.id}
                    >
                      <Box mt={2}>
                      <ProductCardDelivery
                        className={classes.productCard}
                        product={product}
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
