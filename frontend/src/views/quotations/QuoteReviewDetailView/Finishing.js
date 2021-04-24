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

const Finishing = (props) => {
    return(
        <Grid item xs={12}>
            <Typography
                color="textPrimary"
                variant="h3"
                align="left"
            >
                Finishing
            </Typography>
            <Typography
                color="textSecondary"
                variant="h5"
                align="left"
            >
                Lamination
            </Typography>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Total Lamination Costs"
                margin="normal"
                name="quotation.total_lamination_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_lamination_costs}
                variant="outlined"
            >
            </TextField>
            <Typography
                color="textSecondary"
                variant="h5"
                align="left"
            >
                Binding
            </Typography>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Total Binding Costs"
                margin="normal"
                name="quotation.total_binding_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_binding_costs}
                variant="outlined"
            >
            </TextField>
            <Typography
                color="textSecondary"
                variant="h5"
                align="left"
            >
                Folding
            </Typography>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Total Folds"
                margin="normal"
                name="quotation.total_folds"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_folds}
                variant="outlined"
            >
            </TextField>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Total Folding Costs"
                margin="normal"
                name="quotation.total_folding_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_folding_costs}
                variant="outlined"
            >
            </TextField>
            <Typography
                color="textSecondary"
                variant="h5"
                align="left"
            >
                Gathering
            </Typography>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Total Gathering Costs"
                margin="normal"
                name="quotation.total_gathering_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.total_gathering_costs}
                variant="outlined"
            >
            </TextField>
        </Grid>
    )
}
export default Finishing;