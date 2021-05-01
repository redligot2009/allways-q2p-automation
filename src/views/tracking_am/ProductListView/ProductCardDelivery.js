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
                Final Total Costs (w/ Markup)
              </Typography>
              <Typography
              align="left"
              color="textPrimary"
              variant="body1"
              >
                Final Unit Costs (w/ Markup)
              </Typography>
            </Grid>
            <Grid
            item
            justify="space-between"
            spacing={2}
            >
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >
                {product.orderPrice}
              </Typography>
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >
                {product.unitCost}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography
            color="textSecondary"
            variant="subtitle2"
            align="right"
          >
            Total: {product.totalPrice}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" style = {{marginRight: 8}} color="primary" md={3}>CONTACT DRIVER</Button>
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