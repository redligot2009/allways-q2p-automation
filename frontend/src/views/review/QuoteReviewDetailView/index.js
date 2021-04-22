import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
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
                    maxWidth="sm"
                >
                    <Formik
                        initialValues={{
                            // TODO: Fetch quotation data and store in initialValues quotation object.
                            quotation: {}
                        }}
                        onSubmit={(values, actions) => {

                        }}
                    >
                    <Typography
                        color="textPrimary"
                        variant="h2"
                    >
                        Review and compute quotation
                    </Typography>
                    </Formik>
                </Container>
            </Box>
        </Page>);
}

export default QuoteReviewDetail;