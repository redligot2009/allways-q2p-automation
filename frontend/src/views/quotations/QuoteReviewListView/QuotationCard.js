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

const ProductCard = ({ className, quotation, ...rest }) => {
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
            {quotation.project_name}
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
                {quotation.client.full_name}
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
                {quotation.product_type.product_name}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="h5"
              >
                Created:
              </Typography>
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="body1"
              >
                {new Date(quotation.created_date).toLocaleDateString()}
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
                Approval Status: 
              </Typography>
              <Typography 
                align="left" 
                color="textSecondary" 
                gutterBottom 
                variant="body1"
              >
                { getApprovalStatus() }
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
                {(Number)(quotation.page_length).toFixed(2)}" x {(Number)(quotation.page_width).toFixed(2)}"
                {/* {(Number)(quotation.raw_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})} */}
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
                {quotation.paper_types}
                {/* {(Number)(quotation.raw_unit_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})} */}
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
                {quotation.lamination_types}
                {/* {(Number)(quotation.final_total_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})} */}
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
                {quotation.binding_types}
                {/* {(Number)(quotation.final_unit_costs).toLocaleString('en-PH',{currency:'PHP',style:'currency'})} */}
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
                navigate('/app/quote/detail',{state: {id: quotation.id}})
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

ProductCard.propTypes = {
  className: PropTypes.string,
  quotation: PropTypes.object.isRequired
};

export default ProductCard;
