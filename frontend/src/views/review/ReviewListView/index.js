import React, { useState, useEffect } from 'react';
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
// import data from './data';
import axios from 'axios'

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

const ProductList = () => {
  const classes = useStyles();
  const [data, setData] = useState({quotations:[]});
  useEffect(() => {
    async function fetchData(){
      const result = await axios.get('api/quotations/');
      console.log(result.data);
      setData({ quotations: result.data });
    }
    fetchData();
  }, [])
  // console.log(products);
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
          Order Review
        </Typography>
        <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              Awaiting Computation for Job Order
            </Typography>
              <Box mt={2}>
                {data.quotations.map((quotation) => (
                  <Grid
                    item
                    key={quotation.id}
                    lg={12}
                    md={6}
                    xs={12}
                  >
                    <Box mt={2}>
                    <ProductCard
                      className={classes.productCard}
                      product={quotation}
                    />
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid item xs>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                Recently Approved Job Orders
              </Typography>
                <Box mt={2}>
                  {data.quotations.map((quotation) => (
                    <Grid
                      item
                      key={quotation.id}
                      lg={12}
                      md={6}
                      xs={12}
                    >
                      <Box mt={2}>
                      <ProductCardDelivery
                        className={classes.productCard}
                        product={quotation}
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
