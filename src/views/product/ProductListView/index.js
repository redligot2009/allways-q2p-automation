import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProductCards from './ProductCards';
import data from './data';

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
  const [products] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Product List"
    >
      <Container maxWidth={false}>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h2"
        >
          Product List
        </Typography>
        <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs>
              <Box mt={2}>
                {products.map((product) => (
                  <Grid
                    item
                    key={product.id}
                    lg={12}
                    md={6}
                    xs={12}
                  >
                    <Box mt={2}>
                    <ProductCards
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
