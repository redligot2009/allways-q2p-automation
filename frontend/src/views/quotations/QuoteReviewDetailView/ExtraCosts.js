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

const ExtraCosts = (props) => {
    return (
        <Grid item xs={12}>
            <Typography
                color="textPrimary"
                variant="h3"
                align="left"
            >
                Extra Costs
            </Typography>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Cutting Costs"
                margin="normal"
                name="quotation.cutting_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.cutting_costs}
                variant="outlined"
            >
            </TextField>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Packaging Costs"
                margin="normal"
                name="quotation.packaging_costs"
                onBlur={props.handleBlur}
                onChange={props.andleChange}
                value={props.values.quotation.packaging_costs}
                variant="outlined"
            >
            </TextField>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Transport Costs"
                margin="normal"
                name="quotation.transport_costs"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.transport_costs}
                variant="outlined"
            >
            </TextField>
        </Grid>
    )
}
export default ExtraCosts;