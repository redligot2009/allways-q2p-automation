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
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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

const JobOrderCard = ({ className, jobOrder, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
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
            {jobOrder.quotation.project_name}
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
                {jobOrder.quotation.client.full_name}
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
                {jobOrder.quotation.product_type.product_name}
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
        </Box>
        <Box>
          {/* <Button 
            variant="contained" 
            color="primary" 
            md={3}
            onClick={
              ()=>{
                navigate('/app/quote/detail',{state: {id: quotation.id}})
              }
            }
          >
            COMPUTE QUOTATION
          </Button> */}
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
          </Button>
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
