import React, {useState, useEffect} from 'react';
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

const JobOrderCard = ({ className, jobOrder, currentUserProfile, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            {jobOrder && jobOrder.quotation.project_name}
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
                {jobOrder && jobOrder.quotation.client.full_name}
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
                {jobOrder && jobOrder.quotation.product_type.product_name}
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
                {(Number)(jobOrder && jobOrder.quotation.page_length).toFixed(2)}" x {(Number)(jobOrder && jobOrder.quotation.page_width).toFixed(2)}"
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
                {jobOrder && jobOrder.quotation.paper_types}
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
                {jobOrder && jobOrder.quotation.lamination_types}
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
                {jobOrder.quotation.binding_types}
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
          { currentUserProfile && limitVisibility(
              <Button 
                variant="outlined" 
                color="primary"
                onClick={
                  ()=>{
                    // navigate('/app/quote/detail',{state: {id: quotation.id}})
                  }
                }
              >
                REVIEW PRODUCT SPECS
              </Button>,
              ['O','AM'],
              currentUserProfile.job_position,
              false
            )
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
