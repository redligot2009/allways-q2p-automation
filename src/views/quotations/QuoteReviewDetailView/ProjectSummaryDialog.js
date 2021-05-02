import React, {useState, useEffect} from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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
    makeStyles,
    Select,
    MenuItem,
    InputLabel,
    Dialog, DialogContent, DialogTitle
} from '@material-ui/core';
import Page from 'src/components/Page';
import {format} from 'date-fns';

import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const ProjectSummaryDialog = (props) => {
    return (props.values.quotation &&
        <Dialog open={props.openDialog} onClose={props.handleCloseDialog} fullWidth={true} maxWidth = {'sm'}>
            <DialogTitle>
                <Typography
                    color="textPrimary"
                    variant="h3"
                    align="left"
                >
                    Project Summary
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Container spacing={3} my={3}>
                    <Grid container spacing={2}>
                        <Typography
                            color="textSecondary"
                            variant="h4"
                            align="left"
                        >
                            Computed Raw Project Costs
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                    align="left"
                                >
                                    Raw Total Costs
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justify="flex-end">
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                        align="left"
                                    >
                                        P {props.values.quotation.raw_total_costs}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                    align="left"
                                >
                                    Raw Unit Costs
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justify="flex-end">
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                        align="left"
                                    >
                                        P {props.values.quotation.raw_unit_costs}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Typography
                            color="textSecondary"
                            variant="h4"
                            align="left"
                        >
                            Computed Final Project Costs
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                    align="left"
                                >
                                    Final Total Costs (w/ Markup)
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justify="flex-end">
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                        align="left"
                                    >
                                        P {props.values.quotation.final_total_costs}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                    align="left"
                                >
                                    Final Unit Costs (w/ Markup)
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justify="flex-end">
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                        align="left"
                                    >
                                        P {props.values.quotation.final_unit_costs}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                // color="primary"
                                // disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="button"
                                variant="outlined"
                                onClick={props.handleGoBack}
                            >
                                Return to Quote Review
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                color="primary"
                                disabled={props.values.finishComputing}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                // onClick={handleOpenDialog}
                                onClick={(e)=>{
                                    props.values.finishComputing = true;
                                    props.handleSubmit(e);
                                }}
                            >
                                Submit Quotation
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
            
        </Dialog>
    )
}
export default ProjectSummaryDialog;