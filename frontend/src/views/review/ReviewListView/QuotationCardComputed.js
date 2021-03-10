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

const QuotationCardComputed = ({ className, quotation, ...rest }) => {
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
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" flexDirection="column" mb={3}>
          <Grid container justify="space-between">
            <Typography align="left" color="textPrimary" gutterBottom variant="h4">
              {quotation.project_name}
            </Typography>
            <Typography color="textSecondary" variant="subtitle2" align="bottom">
              STATUS: { getApprovalStatus() }
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
            <Grid item justify="space-between" spacing={2}>
              <Typography align="left" color="textPrimary" variant="body1">
                Final Total Costs (w/ Markup)
              </Typography>
              <Typography align="left" color="textPrimary" variant="body1">
                Final Unit Costs (w/ Markup)
              </Typography>
            </Grid>
            <Grid item justify="space-between" spacing={2}>
              <Typography color="textSecondary" variant="subtitle2" align="right">
                {(Number)(quotation.final_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
              </Typography>
              <Typography color="textSecondary" variant="subtitle2" align="right">
                {(Number)(quotation.final_unit_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography
            color="textSecondary"
            variant="subtitle2"
            align="right"
          >
            Total: {(Number)(quotation.final_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="error" md={3}>CANCEL JOB ORDER</Button>
          <Button variant="outlined" color="primary">REVIEW PRODUCT SPECS</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

QuotationCardComputed.propTypes = {
  className: PropTypes.string,
  quotation: PropTypes.object.isRequired
};

export default QuotationCardComputed;
