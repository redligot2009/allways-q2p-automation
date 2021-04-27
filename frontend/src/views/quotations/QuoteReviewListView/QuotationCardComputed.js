import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

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

const QuotationCardComputed = ({ className, quotation, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const getApprovalStatus = () => {
    switch(quotation.approval_status)
    {
      case "in_progress":
        return "In Progress";
      case "approved":
        return "Approved";
      case "not_approved":
        return "Not Approved";
      case "computed":
        return "Computed";
      default:
        return "Unknown";
    }
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" flexDirection="column" mb={3}>
          <Grid container justify="space-between">
            <Grid
              item
              xs={8}
            >
              <Typography 
                align="left" 
                color="textPrimary" 
                gutterBottom 
                variant="h4"
              >
                {quotation.project_name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Typography 
                color="textSecondary" 
                variant="subtitle2" 
                align="right"
                xs={4}
              >
                STATUS: { getApprovalStatus() }
              </Typography>
            </Grid>
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
            <Grid item justify="space-between" spacing={2}>
              <Typography align="left" color="textPrimary" variant="body1">
                Raw Total Costs (w/o Markup)
              </Typography>
              <Typography align="left" color="textPrimary" variant="body1">
                Markup Costs
              </Typography>
            </Grid>
            <Grid item justify="space-between" spacing={2}>
              <Typography color="textSecondary" variant="subtitle2" align="right">
                {(Number)(quotation.raw_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
              </Typography>
              <Typography color="textSecondary" variant="subtitle2" align="right">
                {(Number)(quotation.markup_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography
            color="textSecondary"
            variant="subtitle2"
            align="right"
          >
            Total Costs: {(Number)(quotation.final_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
            align="right"
          >
            (Unit Costs: {(Number)(quotation.final_unit_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})})
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Button 
              fullWidth
              variant="contained" 
              color="primary" 
              md={3}
            >
              CREATE JOB ORDER
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button 
              fullWidth
              variant="outlined" 
              color="primary"
              onClick={
                ()=>{
                  navigate('/app/quote/detail',{state: {id: quotation.id}})
                }
              }
            >
              REVIEW PROJECT SPECS
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

QuotationCardComputed.propTypes = {
  className: PropTypes.string,
  quotation: PropTypes.object.isRequired
};

export default QuotationCardComputed;
