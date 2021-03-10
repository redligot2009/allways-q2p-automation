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
import GetAppIcon from '@material-ui/icons/GetApp';
import { AddBoxOutlined } from '@material-ui/icons';

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
          mb={1}
        >
          <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h4"
          >
            {product.project_name}
          </Typography>
          <Typography
          align="left"
          color="textSecondary"
          gutterBottom
          variant="h5"
          >
            {product.product_type.product_name}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          mb={3}
        >
          <Grid
          container
          spacing={1}
          >
            <Grid
            item
            xs={5}
            >
              <Typography
              align="left"
              color="textSecondary"
              variant="body1"
              >
                Quantity: {product.quantity}
              </Typography>
            </Grid>
            <Grid
            item
            xs={7}
            >
              <Grid
                container
              >
              <Typography
              align="left"
              color="textSecondary"
              variant="body1"
              >
                Length: {product.length}
              </Typography>
              <Typography
              align="left"
              color="textSecondary"
              variant="body1"
              >
                Width: {product.width}
              </Typography>
              </Grid>
            </Grid>
            <Grid
            item
            xs={5}
            >
              <Typography
              align="left"
              color="textSecondary"
              variant="body1"
              >
                Total Pages: {product.totalPages}
              </Typography>
            </Grid>
            <Grid
            item
            xs={7}
            >
              <Typography
              align="left"
              color="textSecondary"
              variant="body1"
              >
                Number of Colors: {product.numberColors}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Button variant="contained" color="primary" md={3}>COMPUTE QUOTATION</Button>
          <Button variant="outlined" color="primary">REVIEW PRODUCT SPECS</Button>
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
