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
// import ProjectSettings from './ProjectSettings';
// import Finishing from './Finishing';
// import PlatesRunningPaper from './PlatesRunningPaper';
// import ExtraCosts from './ExtraCosts';
// import ProjectSummaryDialog from './ProjectSummaryDialog';

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
    "total_pages": 36,
    "markup_percentage": 0.15,
    "margin_of_error": 0.1,
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
            "no_plates_per_copy": 2,
            "no_impressions_per_plate": 300,
            "no_sheets_ordered_for_copy": 0.25,
            "quotation": 1
        }
    ],
    "page_length": 8.5,
    "page_width": 11.0,
    "pages_can_fit": 4,
    "total_binding_costs": 500.0,
    "total_folds": 4,
    "cutting_costs": 200.0,
    "packaging_costs": 200.0,
    "transport_costs": 400.0
}
*/

const RequestForQuotation = (props) => {
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
    const { profile: currentUserProfile } = useSelector((state) => state.auth)
    
    async function fetchData()
    {
        try
        {
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

    function createQuotation (quotation) {
        // console.log(quotation);
        const allowedQuotationFields = [
            "project_name",
            "product_type",
            "created_date",
            "client",
            "approval_status",
            "printing_process",
            "quantity",
            "items"
        ]
        const allowedQuotationItemFields = [
            'lamination',
            'binding',
            'paper',
            'extra_plates',
            'item_type',
            'no_colors',
            'quotation'
        ]

        const filteredQuotationData = Object.keys(quotation)
            .filter(key => allowedQuotationFields.includes(key))
            .reduce((object,key)=>{
                object[key] = quotation[key]
                return object
            }, {});

        // console.log(quotation.items);
        const filteredQuotationItemsData = []

        for(let i = 0; i < quotation.items.length; i++)
        {
            let item = quotation.items[i];
            // console.log(item);
            let filteredQuotationItemData = Object.keys(item)
                .filter(key=>allowedQuotationItemFields.includes(key))
                .reduce((object,key)=>{
                    object[key] = item[key]
                    return object;
                },{});
            filteredQuotationItemsData.push(filteredQuotationItemData);
        }
        filteredQuotationData.items = filteredQuotationItemsData;

        const createResult = axios.post(`api/quotations/`,filteredQuotationData)
            .then(
                (response)=>{
                    console.log("SUCCESS! (?) ", response.data);
                }
            )
            .catch(
                (error)=>{
                    console.log(JSON.stringify(filteredQuotationData));
                    console.log(filteredQuotationData);
                    console.log(error);
                }
            );
    }
    useEffect(() => {    
        fetchData();
    }, [])
    // console.log(quoteDetails)
    return (
        <Page
          className={classes.root}
          title="Request for Quotation"
        >
            <Box
                display="flex"
                flexDirection="column"
                overflow="auto"
                height="100%"
            >
                <Container 
                    maxWidth={800}
                >
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            quotation: {
                                "project_name": "",
                                "product_type": 1,
                                "client": currentUserProfile.id,
                                "page_length":8.5,
                                "page_width":11,
                                "quantity": 1,
                                "total_pages":1,
                                "items": [{
                                    lamination: null,
                                    binding: null,
                                    paper: null,
                                    item_type: "cover",
                                    no_colors: 4
                                },
                                {
                                    lamination: null,
                                    binding: null,
                                    paper: null,
                                    item_type: "inner",
                                    no_colors: 4
                                }]
                            },
                            finishComputing: false,
                        }}
                        onSubmit={(values, actions) => {
                            // console.log(values.quotation);
                            createQuotation(values.quotation);
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
                                        />
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    // inputProps = {
                                                    //     { readOnly: true, }
                                                    // }
                                                    type="number"
                                                    label="Quantity"
                                                    margin="normal"
                                                    name="quotation.quantity"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quotation.quantity}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
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
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box mb={1}>
                                        <Typography
                                            color="textSecondary"
                                            variant="h5"
                                            align="left"
                                        >
                                            Project Dimensions
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            align="left"
                                        >
                                            Folded Size
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
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
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
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
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
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
                                                    />
                                                    )
                                                }}
                                        </FieldArray>
                                        </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} justify="flex-end">
                                <Grid item>
                                    <Button
                                        color="primary"
                                        // disabled={isSubmitting}
                                        // fullWidth
                                        size="large"
                                        type="button"
                                        variant="contained"
                                        onClick={(e)=>{
                                            values.finishComputing=true;
                                            handleSubmit(e);
                                        }}
                                        // onClick={handleSubmit}
                                    >
                                        Submit Request for Quotation
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}  
                    </Formik>
                </Container>
            </Box>
        </Page>
    );
}

export default RequestForQuotation;