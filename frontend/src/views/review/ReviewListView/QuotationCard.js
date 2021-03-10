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

const ProductCard = ({ className, quotation, ...rest }) => {
  const classes = useStyles();

  const getApprovalStatus = () => {
    switch(quotation.approval_status)
    {
      case "in_progress":
        return "In Progress";
      case "approved":
        return "Approved";
      case "not_approved":
        return "Not Approved";
      default:
        return "Unknown";
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography align="left" color="textPrimary" gutterBottom variant="h4">
            {quotation.project_name}
          </Typography>
          <Typography align="left" color="textSecondary" gutterBottom variant="h5">
            Created: {new Date(Date.parse(quotation.created_date)).toLocaleDateString()}
          </Typography>
          <Typography align="left" color="textSecondary" gutterBottom variant="h5">
            Approval Status: { getApprovalStatus() }
          </Typography>
          <Typography align="left" color="textSecondary" gutterBottom variant="h5">
            Client: {quotation.client.full_name}
          </Typography>
          <Typography align="left" color="textSecondary" gutterBottom variant="h5">
            Product Type: {quotation.product_type.product_name}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography align="left" color="textSecondary" variant="h5">
                Raw Total Costs:
              </Typography>
              <Typography align="left" color="textSecondary" variant="body1">
                {(Number)(quotation.raw_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography align="left" color="textSecondary" variant="h5">
                Raw Unit Costs:
              </Typography>
              <Typography align="left" color="textSecondary" variant="body1">
                {(Number)(quotation.raw_unit_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography align="left" color="textSecondary" variant="h5">
                Final Total Costs: 
              </Typography>
              <Typography align="left" color="textSecondary" variant="body1">
                {(Number)(quotation.final_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textSecondary" variant="h5">
                Final Unit Costs:
              </Typography>
              <Typography align="left" color="textSecondary" variant="body1">
                {(Number)(quotation.final_unit_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
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
