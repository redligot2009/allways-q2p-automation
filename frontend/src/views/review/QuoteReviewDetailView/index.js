import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, FieldArray, getIn } from 'formik';
import {
    Grid,
    Row,
    Column,
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import { useDispatch, useSelector } from "react-redux";

// import { register } from "../../_actions/auth";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

const QuoteReviewDetail = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    // const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    return (
        <Page
          className={classes.root}
          title="Register"
        >
            <Box
                display="flex"
                flexDirection="column"
                overflow="auto"
                height="100%"
            >
                <Container 
                    maxWidth={false}
                >
                    <Formik
                        initialValues={{
                            // TODO: Fetch quotation data and store in initialValues quotation object.
                            quotation: {}
                        }}
                        onSubmit={(values, actions) => {

                        }}
                    >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        values
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Box mb={3}>
                                <Typography
                                    color="textPrimary"
                                    variant="h2"
                                >
                                    Quotation #1
                                </Typography>
                                
                            </Box>
                            <Grid container alignItems="center">
                                <Grid item xs={12} sm={6}>
                                    <Box mb={3}>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h3"
                                                align="left"
                                            >
                                                Project Settings
                                            </Typography>
                                            <Box mb={1}>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h4"
                                                    align="left"
                                                >
                                                    Project Information
                                                </Typography>

                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Project Name
                                                </Typography>

                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Client Name
                                                </Typography>

                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Created Date
                                                </Typography>

                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Approval Status
                                                </Typography>

                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Approval Date
                                                </Typography>

                                            </Box>
                                            <Box mb={1}>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h4"
                                                    align="left"
                                                >
                                                    Project Dimensions
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Page Length
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Page Width
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Spread Length
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Spread Width
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h3"
                                                align="left"
                                            >
                                                Quotation Items
                                            </Typography>
                                            
                                            <FieldArray name="items">
                                                {({ push, remove }) => (
                                                    <Grid item xs={12}>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h4"
                                                            align="left"
                                                        >
                                                            Quotation Item #1
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h5"
                                                            align="left"
                                                        >
                                                            Item Type
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h5"
                                                            align="left"
                                                        >
                                                            Number of Colors
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h5"
                                                            align="left"
                                                        >
                                                            Number of Plates Per Copy
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h5"
                                                            align="left"
                                                        >
                                                            Number of Impressions Per Plate
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h5"
                                                            align="left"
                                                        >
                                                            Number of Paper Sheets Per Copy
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h5"
                                                            align="left"
                                                        >
                                                            Lamination Type
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h5"
                                                            align="left"
                                                        >
                                                            Binding Type
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="h5"
                                                            align="left"
                                                        >
                                                            Paper Type
                                                        </Typography>
                                                    </Grid>
                                                )}
                                            </FieldArray>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box mb={3}>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h3"
                                                align="left"
                                            >
                                                Plates, Paper, and Running
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Number of Plates
                                            </Typography>

                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Total Plate Costs
                                            </Typography>

                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Total Running Costs
                                            </Typography>
                                            
                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Total Number of Impressions
                                            </Typography>
                                            
                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Total Number of Sheets
                                            </Typography>

                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Number of Pages
                                            </Typography>

                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Total Paper Costs
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={12}>
                                            
                                            <Typography
                                                color="textPrimary"
                                                variant="h3"
                                                align="left"
                                            >
                                                Finishing (Lamination, Binding, Folding, Gathering)
                                            </Typography>
                                            
                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Total Folds
                                            </Typography>

                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Total Folding Costs
                                            </Typography>
                                            
                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Total Binding Costs
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h3"
                                                align="left"
                                            >
                                                Cutting, Packaging, Transport
                                            </Typography>
                                            
                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Cutting Costs
                                            </Typography>

                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Packaging Costs
                                            </Typography>

                                            <Typography
                                                color="textSecondary"
                                                variant="h5"
                                                align="left"
                                            >
                                                Transport Costs
                                            </Typography>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                        </Form>
                    )}  
                    </Formik>
                </Container>
            </Box>
        </Page>);
}

export default QuoteReviewDetail;