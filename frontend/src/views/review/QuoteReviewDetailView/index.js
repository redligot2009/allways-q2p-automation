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
                                        binding: {
                                            id: 4,
                                            binding_type: "Saddle-stitched",
                                            binding_base_price: 5.0
                                        },
                                        paper: {
                                            id: 19,
                                            "paper_type": "C2S 80",
                                            "paper_category": "Coated & Matte Paper",
                                            "paper_length": 25.0,
                                            "paper_width": 38.0
                                        },
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
                                        lamination: {
                                            id: 1,
                                            lamination_type: "Plastic Matte",
                                            base_price: 0.00725,
                                            min_rate: 1100.0
                                        },
                                        binding: {
                                            id: 4,
                                            binding_type: "Saddle-stitched",
                                            binding_base_price: 5.0
                                        },
                                        paper: {
                                            id: 27,
                                            paper_type: "C2S 220",
                                            paper_category: "Coated & Matte Paper",
                                            paper_length: 25.0,
                                            paper_width: 38.0
                                        },
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
                                            <Box mb={1} mr={2}>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h4"
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
                                                    name="client_name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.client.full_name + " (" +  values.quotation.client.user + ")"}
                                                    variant="filled"
                                                >
                                                    
                                                </TextField>
                                                {/* <Typography
                                                    color="textSecondary"
                                                    variant="h5"
                                                    align="left"
                                                >
                                                    Created Date
                                                </Typography> */}

                                                <TextField
                                                    fullWidth
                                                    // inputProps = {
                                                    //     { readOnly: true, }
                                                    // }
                                                    type="date"
                                                    label="Created Date"
                                                    margin="normal"
                                                    name="quotation.created_date"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.created_date}
                                                    defaultValue={values.quotation.created_date}
                                                    variant="filled"
                                                    InputLabelProps={{ shrink: true }}
                                                >

                                                </TextField>
                                                {/* {console.log(values.quotation.created_date)} */}
                                                {/* <Box my={1}>
                                                    <InputLabel id="approvalStatus">Approval Status</InputLabel>
                                                </Box> */}
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