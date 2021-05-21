import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { createJobOrder } from "../../_actions/jobOrder";
import { updateQuotation, getQuotationById, approveQuotation, archiveQuotation } from "../../_actions/quotation";
import { getJobPosition } from "../../_helpers/index";

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

const QuotationCardComputed = ({ className, quotation, fetchData, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const source = axios.CancelToken.source()

  const {profile : currentUserProfile} = useSelector(state=>state.auth);
  const { currentQuotation } = useSelector(state=>state.quotation);
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
  
  const isUserClient = () => {
    try
    {
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
    catch(error)
    {
      return false;
    }
  }

  useEffect(() => {
    return () => {
      source.cancel();
    }
  }, [source])

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" flexDirection="column" mb={1}>
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
            <Grid item xs={12}>
              <Typography 
                  color="textSecondary" 
                  variant="h5" 
                  align="left"
                  display="inline"
              >
                Product Type:&nbsp;
              </Typography> 
              <Typography 
                  color="textSecondary" 
                  variant="body1" 
                  align="left"
                  display="inline"
              >
                {quotation.product_type.product_name}
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
            { (isUserClient()) ? 
              <Grid item>
                <Grid 
                  container 
                  spacing={1}
                >
                  <Grid 
                    item 
                    xs={12} md={6}
                  >
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="h5"
                    >
                      Page Dimensions:
                    </Typography>
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="body1"
                    >
                      {(Number)(quotation.page_length).toFixed(2)}" x {(Number)(quotation.page_width).toFixed(2)}"
                      {/* {(Number)(quotation.raw_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})} */}
                    </Typography>
                  </Grid>
                  <Grid 
                    item 
                    xs={12} md={6}
                  >
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="h5"
                    >
                      Quantity:
                    </Typography>
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="body1"
                    >
                      {quotation.quantity} copies
                    </Typography>
                  </Grid>
                  <Grid 
                    item 
                    xs={12} md={6}
                  >
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="h5"
                    >
                      Paper Types:
                    </Typography>
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="body1"
                    >
                      {quotation.paper_types}
                      {/* {(Number)(quotation.raw_unit_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})} */}
                    </Typography>
                  </Grid>
                  <Grid 
                    item 
                    xs={12} md={6}
                  >
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="h5"
                    >
                      Lamination Types: 
                    </Typography>
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="body1"
                    >
                      {quotation.lamination_types}
                      {/* {(Number)(quotation.final_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})} */}
                    </Typography>
                  </Grid>
                  <Grid 
                    item 
                    xs={12} md={6}
                  >
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="h5"
                    >
                      Binding Types:
                    </Typography>
                    <Typography 
                      align="left" 
                      color="textSecondary" 
                      gutterBottom 
                      variant="body1"
                    >
                      {quotation.binding_types}
                      {/* {(Number)(quotation.final_unit_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})} */}
                    </Typography>
                  </Grid>
              </Grid>
            </Grid>
            :
              <>
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
              </>
            }
            
          </Grid>
          <Divider />
          {quotation.approval_status!=="in_progress"? 
          <>
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
          </>:<></>}
          
        </Box>
        <Grid container>
          {
            (isUserClient()) ? 
            (quotation.approval_status === "computed") && 
              <>
                <Button 
                  fullWidth
                  variant="contained" 
                  color="primary" 
                  md={3}
                  onClick={async ()=>{
                    // console.log("YO!");
                    // console.log(quotation);
                    dispatch(approveQuotation(quotation.id,source.token));
                    fetchData();
                    // props.fetchData();
                  }}
                >
                  Approve Quotation
                </Button>
              </>
            :
              <>
              <Grid item xs={12} md={6}>
                <Button 
                  fullWidth
                  disabled={quotation.approval_status !== "approved"}
                  variant="contained" 
                  color="primary" 
                  md={3}
                  onClick={()=>{
                    dispatch(archiveQuotation(quotation.id, source.token))
                    .then((response)=>{
                      dispatch(createJobOrder(currentQuotation,currentUserProfile,source.token))
                    })
                    .catch((error)=>{

                    })
                    fetchData()
                  }}
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
            </>
          }
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
