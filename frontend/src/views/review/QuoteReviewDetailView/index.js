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
    makeStyles,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core';
import Page from 'src/components/Page';
import {format} from 'date-fns';

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

/*
FORMAT FOR POST REQUEST:
{
    "project_name": "OISCA Forest Booklet",
    "product_type": 1,
    "approval_status": "in_progress",
    "printing_process": "offset",
    "quantity": 300,
    "items": [
        {
            "id": 1,
            "lamination": null,
            "binding": 4,
            "paper": 19,
            "extra_plates": [],
            "item_type": "inner",
            "no_colors": 4,
            "no_plates_per_copy": 9,
            "no_impressions_per_plate": 300,
            "no_sheets_ordered_for_copy": 2.25,
            "quotation": 1
        },
        {
            "id": 4,
            "lamination": 1,
            "binding": 4,
            "paper": 27,
            "extra_plates": [],
            "item_type": "cover",
            "no_colors": 4,
            "no_plates_per_copy": 1,
            "no_impressions_per_plate": 300,
            "no_sheets_ordered_for_copy": 0.25,
            "quotation": 1
        }
    ]
}
*/

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
                            quotation: {
                                id: 1,
                                items: [
                                    {
                                        lamination: null,
                                        binding: 4,
                                        // {
                                        //     id: 4,
                                        //     binding_type: "Saddle-stitched",
                                        //     binding_base_price: 5.0
                                        // },
                                        paper: 19,
                                        // {
                                        //     id: 19,
                                        //     "paper_type": "C2S 80",
                                        //     "paper_category": "Coated & Matte Paper",
                                        //     "paper_length": 25.0,
                                        //     "paper_width": 38.0
                                        // },
                                        extra_plates: [],
                                        lamination_costs: 0.0,
                                        running_costs: 2400.0,
                                        paper_costs: 3240.0,
                                        item_type: "inner",
                                        no_colors: 4,
                                        no_plates_per_copy: 9,
                                        no_impressions_per_plate: 300,
                                        no_sheets_ordered_for_copy: 2.25
                                    },
                                    {
                                        lamination: 1,
                                        // {
                                        //     id: 1,
                                        //     lamination_type: "Plastic Matte",
                                        //     base_price: 0.00725,
                                        //     min_rate: 1100.0
                                        // },
                                        binding: 4,
                                        // {
                                        //     id: 4,
                                        //     binding_type: "Saddle-stitched",
                                        //     binding_base_price: 5.0
                                        // },
                                        paper: 27,
                                        // {
                                        //     id: 27,
                                        //     paper_type: "C2S 220",
                                        //     paper_category: "Coated & Matte Paper",
                                        //     paper_length: 25.0,
                                        //     paper_width: 38.0
                                        // },
                                        extra_plates: [],
                                        lamination_costs: 1100.0,
                                        running_costs: 1600.0,
                                        paper_costs: 1125.0,
                                        item_type: "cover",
                                        no_colors: 4,
                                        no_plates_per_copy: 1,
                                        no_impressions_per_plate: 300,
                                        no_sheets_ordered_for_copy: 0.25
                                    }
                                ],
                                product_type: {
                                    id: 1,
                                    product_name: "Book",
                                    product_description: "This test product is a book"
                                },
                                client: {
                                    id: 2,
                                    user: "clayusa",
                                    email: "clayusatest@email.com",
                                    full_name: "Cynthia A Layusa",
                                    organization_name: "Save the Children"
                                },
                                total_no_plates: 40,
                                total_plate_costs: 10000.0,
                                total_no_sheets: 2.5,
                                total_paper_costs: 4365.0,
                                total_running_costs: 4000.0,
                                total_signatures: 5.0,
                                total_folding_costs: 1800.0,
                                total_gathering_costs: 450.0,
                                total_lamination_costs: 1100.0,
                                raw_total_costs: 22815.0,
                                raw_unit_costs: 76.05,
                                final_unit_costs: 87.4575,
                                final_total_costs: 26237.25,
                                project_name: "OISCA Forest Booklet",
                                approval_status: "in_progress",
                                approval_date: null,
                                printing_process: "offset",
                                quantity: 300,
                                total_pages: 36,
                                created_date: format(new Date("2021-03-08T17:44:35+08:00"),'yyyy-MM-dd'),
                                project_file_path: "",
                                page_length: 8.5,
                                page_width: 11.0,
                                spread_length: 11.0,
                                spread_width: 17.0,
                                margin_of_error: 0.1,
                                markup_percentage: 0.15,
                                pages_can_fit: 4,
                                total_binding_costs: 500.0,
                                total_folds: 4,
                                cutting_costs: 200.0,
                                packaging_costs: 200.0,
                                transport_costs: 400.0
                            }
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
                                    Quotation #{values.quotation.id}
                                </Typography>
                                
                            </Box>
                            <Grid container  spacing={3}>
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.project_name}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.client.full_name + " (" +  values.quotation.client.user + ")"}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.created_date}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.approval_status}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.page_length}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.page_width}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.spread_length}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.spread_width}
                                                    variant="outlined"
                                                >
                                                </TextField>
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
                                            
                                            <FieldArray name="quotation.items">
                                                {
                                                    ({ push, remove }) => {
                                                        return <>
                                                            {values.quotation.items.map(
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
                                                                                            ()=>remove(index)
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
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.quotation.items[index].item_type}
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
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.quotation.items[index].no_colors}
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
                                                                                fullWidth
                                                                                // inputProps = {
                                                                                //     { readOnly: true, }
                                                                                // }
                                                                                type="number"
                                                                                label="Number of Plates Per Copy"
                                                                                margin="normal"
                                                                                name={`quotation.items[${index}].no_plates_per_copy`}
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.quotation.items[index].no_plates_per_copy}
                                                                                variant="outlined"
                                                                            >
                                                                            </TextField>
                                                                            <TextField
                                                                                fullWidth
                                                                                // inputProps = {
                                                                                //     { readOnly: true, }
                                                                                // }
                                                                                type="number"
                                                                                label="Number of Impressions Per Plate"
                                                                                margin="normal"
                                                                                name={`quotation.items[${index}].no_impressions_per_plate`}
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.quotation.items[index].no_impressions_per_plate}
                                                                                variant="outlined"
                                                                            >
                                                                            </TextField>
                                                                            <TextField
                                                                                fullWidth
                                                                                // inputProps = {
                                                                                //     { readOnly: true, }
                                                                                // }
                                                                                type="number"
                                                                                label="Number of Paper Sheets Per Copy"
                                                                                margin="normal"
                                                                                name={`quotation.items[${index}].no_sheets_ordered_for_copy`}
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.quotation.items[index].no_sheets_ordered_for_copy}
                                                                                variant="outlined"
                                                                            >
                                                                            </TextField>
                                                                            <TextField
                                                                                select
                                                                                label="Lamination Type"
                                                                                fullWidth
                                                                                margin="normal"
                                                                                name={`quotation.items[${index}].lamination`}
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.quotation.items[index].lamination}
                                                                                variant="outlined"
                                                                            >
                                                                                <MenuItem value={1}>
                                                                                    Plastic Matte
                                                                                </MenuItem>
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
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.quotation.items[index].binding}
                                                                                variant="outlined"
                                                                            >
                                                                                <MenuItem value={4}>
                                                                                    Saddle-stitched
                                                                                </MenuItem>
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
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                value={values.quotation.items[index].paper}
                                                                                variant="outlined"
                                                                            >
                                                                                <MenuItem value={27}>
                                                                                    C2S 220
                                                                                </MenuItem>
                                                                                <MenuItem value={19}>
                                                                                    C2S 80
                                                                                </MenuItem>
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
                                                                fullWidth
                                                                size="large"
                                                                type="button"
                                                                variant="outlined"
                                                                onClick={
                                                                    ()=>push({
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
                                                                        quotation: values.quotation.id
                                                                    })
                                                                }
                                                            >
                                                                Add new item
                                                            </Button>
                                                        </>
                                                    }}
                                            
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
                                                label="Number of Plates"
                                                margin="normal"
                                                name="quotation.total_no_plates"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_no_plates}
                                                variant="outlined"
                                            >
                                            </TextField>
                                            <TextField
                                                fullWidth
                                                // inputProps = {
                                                //     { readOnly: true, }
                                                // }
                                                type="number"
                                                label="Total Plate Costs"
                                                margin="normal"
                                                name="quotation.total_plate_costs"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_plate_costs}
                                                variant="outlined"
                                            >
                                            </TextField>

                                            <TextField
                                                fullWidth
                                                // inputProps = {
                                                //     { readOnly: true, }
                                                // }
                                                type="number"
                                                label="Total Running Costs"
                                                margin="normal"
                                                name="quotation.total_running_costs"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_running_costs}
                                                variant="outlined"
                                            >
                                            </TextField>

                                            <TextField
                                                fullWidth
                                                // inputProps = {
                                                //     { readOnly: true, }
                                                // }
                                                type="number"
                                                label="Total Number of Sheets"
                                                margin="normal"
                                                name="quotation.total_no_sheets"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_no_sheets}
                                                variant="outlined"
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_pages}
                                                variant="outlined"
                                            >
                                            </TextField>
                                            
                                            <TextField
                                                fullWidth
                                                // inputProps = {
                                                //     { readOnly: true, }
                                                // }
                                                type="number"
                                                label="Total Paper Costs"
                                                margin="normal"
                                                name="quotation.total_paper_costs"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_paper_costs}
                                                variant="outlined"
                                            >
                                            </TextField>

                                        </Grid>
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_lamination_costs}
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_binding_costs}
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_folds}
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_folding_costs}
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.total_gathering_costs}
                                                variant="outlined"
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h3"
                                                align="left"
                                            >
                                                Cutting, Packaging, Transport
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.cutting_costs}
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.packaging_costs}
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
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quotation.transport_costs}
                                                variant="outlined"
                                            >
                                            </TextField>
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