import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          mb={3}
        >
          <Grid
          container
          justify="space-between"
          >
            <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="h4"
            >
              {product.orderID}
            </Typography>
            <Typography
              style={{color: 'brown'}}
              variant="subtitle2"
              align="bottom"
            >
              STATUS: {product.status}
            </Typography>
          </Grid>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          mb={3}
        >
          <Grid
          container
          justify="space-between"
          >
          <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="h4"
            color="textSecondary"
            >
              {product.type}
            </Typography>
          </Grid>
          <Grid
          container
          justify="space-between"
          spacing={2}
          >
            
            <Grid
            item
            justify="space-between"
            spacing={2}
            >
              <Typography
              align="left"
              color="textPrimary"
              variant="body1"
              >
                Quantity: {product.quantity} copies
              </Typography>
              <Typography
              align="left"
              color="textPrimary"
              variant="body1"
              >
                Total Pages: {product.quantity} pages
              </Typography>
            </Grid>
            <Grid
            item
            justify="space-between"
            spacing={2}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                Length: {product.length} inches &nbsp; Width: {product.width} inches
              </Typography>
              <Typography
                color="textPrimary"
                variant="body1"
              >
                Number of Colors: {product.numberColors}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Button variant="contained" color="primary" style = {{backgroundColor:'green', marginRight: 8}} md={3}>READY FOR DELIVERY</Button>
          <Button variant="outlined" color="primary">PRINT INVOICE</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
