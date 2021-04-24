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

const ProjectSettings = (props) => 
{
    return (
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
                variant="h5"
                align="left"
            >
                Project Information
            </Typography>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                label="Project Name"
                margin="normal"
                name="quotation.project_name"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.project_name}
                variant="outlined"
            >
            </TextField>    
            <TextField
                fullWidth
                inputProps = {
                    { readOnly: true, }
                }
                label="Client Name"
                margin="normal"
                name="quotation.client.full_name"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.client.full_name + " (" +  props.values.quotation.client.user + ")"}
                variant="filled"
            >

            </TextField>    
            <TextField
                fullWidth
                inputProps = {
                    { readOnly: true, }
                }
                type="date"
                label="Created Date"
                margin="normal"
                name="quotation.created_date"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={format(new Date(props.values.quotation.created_date),"yyyy-MM-dd")}
                // defaultValue={values.quotation.created_date}
                variant="filled"
                InputLabelProps={{ shrink: true }}
            >   
            </TextField>    
            <TextField
                select
                label="Approval Status"
                fullWidth
                margin="normal"
                name="quotation.approval_status"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.approval_status}
                variant="outlined"
            >
                <MenuItem value="in_progress">
                    In Progress
                </MenuItem>
                <MenuItem value="computed">
                    Computed
                </MenuItem>
                <MenuItem value="approved">
                    Approved
                </MenuItem>
                <MenuItem value="not_approved">
                    Not Approved
                </MenuItem>
            </TextField>    
        </Box>
        <Box mb={1}>
            <Typography
                color="textSecondary"
                variant="h5"
                align="left"
            >
                Project Dimensions
            </Typography>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Page Length"
                margin="normal"
                name="quotation.page_length"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.page_length}
                variant="outlined"
            >
            </TextField>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Page Width"
                margin="normal"
                name="quotation.page_width"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.page_width}
                variant="outlined"
            >
            </TextField>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Spread Length"
                margin="normal"
                name="quotation.spread_length"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.spread_length}
                variant="outlined"
            >
            </TextField>
            <TextField
                fullWidth
                // inputProps = {
                //     { readOnly: true, }
                // }
                type="number"
                label="Spread Width"
                margin="normal"
                name="quotation.spread_width"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.quotation.spread_width}
                variant="outlined"
            >
            </TextField>
        </Box>
    </Grid>
    )
}
export default ProjectSettings;