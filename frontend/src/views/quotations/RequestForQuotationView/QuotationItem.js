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

const QuotationItem = (props) => {
    return (
        <Container style={{maxHeight:540,overflow:'auto'}} mb={2}>
            {props.values.quotation.items.map(
                (item,index) => 
                {
                    return (
                        <Grid item xs={12} key={item.id}>
                            <Grid container>
                                <Grid item xs={10}>
                                    <Typography
                                        color="textSecondary"
                                        variant="h4"
                                        align="left"
                                    >
                                        Quotation Item # {index+1}
                                    </Typography>
                                </Grid>
                                <Grid container xs={2} justify="flex-end">
                                    <Button
                                        color="primary"
                                        // disabled={isSubmitting}
                                        size="small"
                                        type="button"
                                        variant="outlined"
                                        onClick={
                                            ()=>props.remove(index)
                                        }
                                    >
                                        X
                                    </Button>
                                </Grid>
                            </Grid>
                            
                            <TextField
                                select
                                label="Item Type"
                                fullWidth
                                margin="normal"
                                name={`quotation.items[${index}].item_type`}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.quotation.items[index].item_type}
                                variant="outlined"
                            >
                                <MenuItem value="inner">
                                    Inner Pages
                                </MenuItem>
                                <MenuItem value="cover">
                                    Cover
                                </MenuItem>
                                <MenuItem value="other">
                                    Other
                                </MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Number of Colors"
                                fullWidth
                                margin="normal"
                                name={`quotation.items[${index}].no_colors`}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.quotation.items[index].no_colors}
                                variant="outlined"
                            >
                                <MenuItem value={1}>
                                    One Color (Black and White)
                                </MenuItem>
                                <MenuItem value={2}>
                                    Two Colors (CMYK)
                                </MenuItem>
                                <MenuItem value={3}>
                                    Three Colors (CMYK)
                                </MenuItem>
                                <MenuItem value={4}>
                                    Four Colors (CMYK)
                                </MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Lamination Type"
                                fullWidth
                                margin="normal"
                                name={`quotation.items[${index}].lamination`}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.quotation.items[index].lamination}
                                variant="outlined"
                            >
                                {props.laminationTypes.map((laminationType, index)=>{
                                    return (
                                        <MenuItem value={laminationType.id}>
                                            {laminationType.lamination_type}
                                        </MenuItem>
                                    )
                                })}
                                <MenuItem value={null}>
                                    None
                                </MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Binding Type"
                                fullWidth
                                margin="normal"
                                name={`quotation.items[${index}].binding`}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.quotation.items[index].binding}
                                variant="outlined"
                            >
                                {props.bindingTypes.map((bindingType, index)=>{
                                    return (
                                        <MenuItem value={bindingType.id}>
                                            {bindingType.binding_type}
                                        </MenuItem>
                                    )
                                })}
                                <MenuItem value={null}>
                                    None
                                </MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Paper Type"
                                fullWidth
                                margin="normal"
                                name={`quotation.items[${index}].paper`}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.quotation.items[index].paper}
                                variant="outlined"
                            >
                                {props.paperTypes.map((paperType, index)=>{
                                    return (
                                        <MenuItem value={paperType.id}>
                                            {paperType.paper_type}
                                        </MenuItem>
                                    )
                                })}
                                <MenuItem value={null}>
                                    None
                                </MenuItem>
                            </TextField>
                        </Grid>
                        )
                    }
                )
            }
            <Button
                color="primary"
                // disabled={isSubmitting}
                // fullWidth
                size="large"
                type="button"
                variant="outlined"
                onClick={
                    ()=>props.push({
                        id: 1,
                        lamination: null,
                        binding: null,
                        paper: null,
                        extra_plates: [],
                        item_type: "other",
                        no_colors: 4,
                        no_plates_per_copy: 1,
                        no_impressions_per_plate: 1,
                        no_sheets_ordered_for_copy: 1,
                        quotation: props.values.quotation.id
                    })
                }
            >
                Add new item
            </Button>
        </Container>
    )
}

export default QuotationItem;