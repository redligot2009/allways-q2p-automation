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
    flexDirection: 'column',
    maxWidth: '300px',
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
              {product.productName}
            </Typography>
          </Grid>
          <Typography
            align="left"
            gutterBottom
            variant="body1"
            color="textSecondary"
            >
              {product.productDescription}
            </Typography>
        </Box>
        <Box>
          <Button variant="outlined" color="primary">KNOW MORE</Button>
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
