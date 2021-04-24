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

// import { register } from "../../_actions/auth";

import QuotationItem from './QuotationItem';

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

/*
TODO: Refactor these 1000+ lines of code into separate files:
- index.js (here)
- ProjectSummary.js
- QuotationItem.js

TODO: Implement update requests to make changes reflect in database. 
Idea: Make it "autosave" and "auto-update." 
(i.e., each time a form field is updated, a PATCH update is made to update the backend, 
    and reflect changes on frontend simultaneously. Kinda like server-side rendering.)
Would this be too costly though? I think not, at least for demo purposes. Optimization can follow.

*/



const QuoteReviewDetail = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    let location = useLocation();
    const dispatch = useDispatch();

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => 
    {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleGoBack = () => {
        navigate('/app/quote/review')
    }

    const [quoteDetails, setQuoteDetails] = useState(null);

    const [paperTypes, setPaperTypes] = useState([]);
    const [laminationTypes, setLaminationTypes] = useState([])
    const [bindingTypes, setBindingTypes] = useState([])
    
    async function fetchData()
    {
        try
        {
            const quoteResult = await axios.get(`api/quotations/${location.state.id}`)
                .then((response)=>{
                    // console.log(response.data);
                    setQuoteDetails(response.data);
                })
                .catch((error) => {
                    handleGoBack();
                })
            const paperResults = await axios.get('api/papers')
                .then((response)=>{
                    // console.log(response.data)
                    setPaperTypes(response.data)
                })
                .catch((error)=>{

                })

            const laminationResults = await axios.get('api/laminations')
                .then((response)=>{
                    // console.log(response.data)
                    setLaminationTypes(response.data)
                })
                .catch((error)=>{

                })
            
            const bindingResults = await axios.get('api/bindings')
                .then((response)=>{
                    // console.log(response.data)
                    setBindingTypes(response.data)
                })
                .catch((error)=>{

                })
        }
        catch(error)
        {
            handleGoBack();
        }
        // console.log(quoteDetails);
    }
    useEffect(() => {    
        fetchData();
    }, [])
    console.log(quoteDetails)
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
                        enableReinitialize={true}
                        initialValues={{
                            quotation: quoteDetails,
                            finishComputing: false,
                        }}
                        onSubmit={(values, actions) => {
                            if(values.finishComputing)
                            {
                                navigate('/app/quote/review')
                            }
                            else
                            {

                                fetchData();
                            }
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
                    }) => (values.quotation &&
                        <Form onSubmit={handleSubmit}>
                            <Box mb={3}>
                                <Typography
                                    color="textPrimary"
                                    variant="h2"
                                >
                                    Quotation #{values.quotation.id}
                                </Typography>
                                
                            </Box>
                            <Grid container spacing={3}>
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
                                                    value={format(new Date(values.quotation.created_date),"yyyy-MM-dd")}
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
                                                        return (
                                                        <QuotationItem
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                            values={values}
                                                            push={push}
                                                            remove={remove}
                                                            laminationTypes={laminationTypes}
                                                            paperTypes={paperTypes}
                                                            bindingTypes={bindingTypes}
                                                        >
                                                        </QuotationItem>
                                                        )
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        color="primary"
                                        // disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="button"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                        // onClick={handleSubmit}
                                    >
                                        Save Changes
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        color="primary"
                                        // disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="button"
                                        variant="contained"
                                        onClick={handleOpenDialog}
                                        // onClick={handleSubmit}
                                    >
                                        Compute Quotation
                                    </Button>
                                </Grid>
                            </Grid>
                            
                            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth = {'sm'}>
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
                                                            P {values.quotation.raw_total_costs}
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
                                                            P {values.quotation.raw_unit_costs}
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
                                                            P {values.quotation.final_total_costs}
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
                                                            P {values.quotation.final_unit_costs}
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
                                                    onClick={handleGoBack}
                                                >
                                                    Go back
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button
                                                    color="primary"
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    // onClick={handleOpenDialog}
                                                    onClick={(e)=>{
                                                        values.finishComputing = true
                                                        handleSubmit(e)
                                                    }}
                                                >
                                                    Submit Quotation
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </DialogContent>
                                
                            </Dialog>
                        </Form>
                    )}  
                    </Formik>
                </Container>
            </Box>
        </Page>);
}

export default QuoteReviewDetail;