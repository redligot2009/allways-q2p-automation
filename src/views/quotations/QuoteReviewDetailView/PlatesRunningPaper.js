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

const PlatesRunningPaper = (props) => {
    return (props.values &&
        <Grid item xs={12}>
            <Typography
                color="textPrimary"
                variant="h3"
                align="left"
            >
                Plates, Running, and Paper
            </Typography>
            {/* <Typography
                color="textSecondary"
                variant="h5"
                align="left"
            >
                Number of Plates
            </Typography> */}
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Pages Can Fit (per plate)"
                margin="normal"
                name="quotation.pages_can_fit"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.pages_can_fit}
                variant="outlined"
            >
            </TextField>
            <TextField
                fullWidth
                inputProps = {
                    { readOnly: true, }
                }
                type="number"
                label="Total Number of Plates"
                margin="normal"
                name="quotation.total_no_plates"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_no_plates}
                variant="filled"
            >
            </TextField>
            <TextField
                fullWidth
                inputProps = {
                    { readOnly: true, }
                }
                type="number"
                label="Total Plate Costs"
                margin="normal"
                name="quotation.total_plate_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_plate_costs}
                variant="filled"
            >
            </TextField>

            <TextField
                fullWidth
                inputProps = {
                    { readOnly: true, }
                }
                type="number"
                label="Total Running Costs"
                margin="normal"
                name="quotation.total_running_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_running_costs}
                variant="filled"
            >
            </TextField>

            <TextField
                fullWidth
                inputProps = {
                    { readOnly: true, }
                }
                type="number"
                label="Total Number of Sheets (per copy)"
                margin="normal"
                name="quotation.total_no_sheets"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_no_sheets}
                variant="filled"
            >
            </TextField>

            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Number of Pages"
                margin="normal"
                name="quotation.total_pages"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_pages}
                variant="outlined"
            >
            </TextField>
            
            <TextField
                fullWidth
                inputProps = {
                    { readOnly: true, }
                }
                type="number"
                label="Total Paper Costs"
                margin="normal"
                name="quotation.total_paper_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_paper_costs}
                variant="filled"
            >
            </TextField>
        </Grid>
    )
}
export default PlatesRunningPaper;