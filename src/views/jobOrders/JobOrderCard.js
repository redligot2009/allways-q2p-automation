import React, {useState, useEffect} from 'react';
import axios from 'axios';
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { limitVisibility } from '../../_helpers/index';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../_actions/auth';
import { startJobOrderProduction, startJobOrderDelivery, finishJobOrder } from 'src/_actions/jobOrder';

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

const JobOrderCard = ({ className, jobOrder, currentUserProfile, fetchData, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const source = axios.CancelToken.source()

  const getProductionStatus = () => {
    switch(jobOrder.production_status)
    {
      case "inprogress":
        return "In Production";
      case "delivery":
        return "Out for Delivery";
      case "pending":
        return "Pending";
      case "finished":
        return "Finished";
      default:
        return "Unknown";
    }
  }

  return (jobOrder &&
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
            {jobOrder.quotation ? jobOrder.quotation.project_name : null}
          </Typography>
          
          <Grid 
            container 
            spacing={1}
          >
            <Grid 
              item 
              xs={6}
            >
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="h5"
              >
                Client: 
              </Typography>
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="body1"
              >
                {jobOrder.quotation ? jobOrder.quotation.client.full_name : null}
              </Typography>
            </Grid>
            <Grid 
              item 
              xs={6}
            >
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="h5"
              >
                Product Type:
              </Typography>
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="body1"
              >
                {jobOrder.quotation ? jobOrder.quotation.product_type.product_name : null}
              </Typography>
            </Grid>
            <Grid 
            container 
            spacing={1}
          >
            <Grid 
              item 
              xs={6}
            >
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="h5"
              >
                Page Dimensions (Length x Width):
              </Typography>
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="body1"
              >
                {(Number)(jobOrder.quotation && jobOrder.quotation.page_length).toFixed(2)}" x {(Number)(jobOrder.quotation && jobOrder.quotation.page_width).toFixed(2)}"
              </Typography>
            </Grid>

            <Grid 
              item 
              xs={6}
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
                {jobOrder.quotation && jobOrder.quotation.paper_types}
              </Typography>
            </Grid>
          </Grid>
          <Grid 
            container 
            spacing={1}
          >
            <Grid 
              item 
              xs={6}
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
                {jobOrder.quotation && jobOrder.quotation.lamination_types}
              </Typography>
            </Grid>
            <Grid 
              item 
              xs={6}
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
                {jobOrder.quotation && jobOrder.quotation.binding_types}
              </Typography>
            </Grid>
            <Grid 
              item 
              xs={6}
            >
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="h5"
              >
                Production Status: 
              </Typography>
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="body1"
              >
                { getProductionStatus() }
              </Typography>
            </Grid>
          </Grid>
          </Grid>
        </Box>
        <Box>
          { currentUserProfile ? 
            <>
            {jobOrder.production_status === 'pending' && 
            limitVisibility(
              <Button 
                variant="outlined" 
                color="primary"
                onClick={
                  async ()=>{
                    await dispatch(startJobOrderProduction(jobOrder,source.token));
                    await fetchData(dispatch);
                    navigate('/app/tracking',{replace:true})
                  }
                }
              >
                BEGIN PRODUCTION
              </Button>,
              ['O','AM'],
              currentUserProfile.job_position,
              false
            )}

            {jobOrder.production_status === 'inprogress' && 
            limitVisibility(
              <Button 
                variant="outlined" 
                color="primary"
                onClick={
                  async ()=>{
                    await dispatch(startJobOrderDelivery(jobOrder,source.token));
                    await fetchData(dispatch);
                    navigate('/app/tracking',{replace:true})
                  }
                }
              >
                FINISH PRODUCTION
              </Button>,
              ['O','AM','P'],
              currentUserProfile.job_position,
              false
            )}

            {jobOrder.production_status === 'delivery' && 
            limitVisibility(
              <Button 
                variant="outlined" 
                color="primary"
                onClick={
                  async ()=>{
                    await dispatch(finishJobOrder(jobOrder,source.token));
                    await fetchData(dispatch);
                    navigate('/app/tracking',{replace:true})
                  }
                }
              >
                FINISH DELIVERY
              </Button>,
              ['O','AM','D'],
              currentUserProfile.job_position,
              false
            )}

            {jobOrder.production_status === 'finished' && 
            limitVisibility(
              <Button 
                variant="outlined" 
                color="primary"
                onClick={
                  ()=>{
                    // navigate('/app/quote/detail',{state: {id: quotation.id}})
                  }
                }
              >
                CREATE INVOICE
              </Button>,
              ['O','AM'],
              currentUserProfile.job_position,
              false
            )}
            </> 
            :
            null
          }
          {/* <Button 
            variant="outlined" 
            color="primary"
            onClick={
              ()=>{
                // navigate('/app/quote/detail',{state: {id: quotation.id}})
              }
            }
          >
            REVIEW PRODUCT SPECS
          </Button> */}
        </Box>
      </CardContent>
    </Card>
  );
};

JobOrderCard.propTypes = {
  className: PropTypes.string,
  jobOrder: PropTypes.object.isRequired
};

export default JobOrderCard;
