import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
                        <form onSubmit={handleSubmit}>
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
                                                variant="h4"
                                                align="center"
                                            >
                                                Project Settings
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h4"
                                                align="center"
                                            >
                                                Plates, Paper, and Running
                                            </Typography>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box mb={3}>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h4"
                                                align="center"
                                            >
                                                Finishing (Lamination, Binding)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h4"
                                                align="center"
                                            >
                                                Cutting, Packaging, Transport
                                            </Typography>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                        </form>
                    )}  
                    </Formik>
                </Container>
            </Box>
        </Page>);
}

export default QuoteReviewDetail;