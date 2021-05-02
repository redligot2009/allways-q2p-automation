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

const QuotationCard = ({ className, quotation, ...rest }) => {
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

  return (quotation && 
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
            fullWidth
            variant="outlined" 
            color="primary"
            onClick={
              ()=>{
                console.log(quotation.id);
                navigate('/app/quote/detail',{state: {id: quotation.id}})
              }
            }
          >
            REVIEW PROJECT SPECS
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

QuotationCard.propTypes = {
  className: PropTypes.string,
  quotation: PropTypes.object.isRequired
};

export default QuotationCard;
