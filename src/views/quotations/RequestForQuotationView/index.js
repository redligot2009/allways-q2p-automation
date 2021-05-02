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

import {createQuotation} from "../../../_actions/quotation";

import QuotationItem from './QuotationItem';

import { toast } from 'react-toastify';

import {uniqueId} from 'lodash';

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

    const [fetched, setFetched] = useState(false)
    
    const source = axios.CancelToken.source()
    
    async function fetchData()
    {
        try
        {
            // const quoteResult = await axios.get(`api/quotations/${location.state.id}`)
            console.log(quoteDetails);
            // TODO: Convert these into Redux actions.
            await axios.get('api/papers', {cancelToken: source.token})
                .then((response)=>{
                    // console.log(response.data)
                    setPaperTypes(response.data)
                })

            await axios.get('api/laminations',{cancelToken: source.token})
                .then((response)=>{
                    // console.log(response.data)
                    setLaminationTypes(response.data)
                })
            
            await axios.get('api/bindings', {cancelToken: source.token})
                .then((response)=>{
                    // console.log(response.data)
                    setBindingTypes(response.data)
                })
        }
        catch(error)
        {
            console.log(error);
            setFetched(false);
            handleGoBack();
        }
        // console.log(quoteDetails);
    }

    function handleCreateQuotation (quotation) {
        return dispatch(createQuotation(quotation))
    }
    useEffect(() => {
        fetchData();
        setFetched(true);
        return ()=>{
            source.cancel();
        }
    }, [])
    // console.log(quoteDetails)
    return (fetched &&
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
                <Container>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            quotation: {
                                "project_name": "",
                                "product_type": 1,
                                "client": (currentUserProfile ? currentUserProfile.id : ""),
                                "page_length":8.5,
                                "page_width":11,
                                "quantity": 1,
                                "total_pages":1,
                                "items": [{
                                    lamination: "",
                                    binding: "",
                                    paper: "",
                                    item_type: "cover",
                                    no_colors: 4
                                },
                                {
                                    lamination: "",
                                    binding: "",
                                    paper: "",
                                    item_type: "inner",
                                    no_colors: 4
                                }]
                            },
                            finishComputing: false,
                        }}
                        onSubmit={(values, actions) => {
                            // console.log(values.quotation);
                            handleCreateQuotation(values.quotation)
                                .then((response)=>{
                                    if(values.finishComputing)
                                    {
                                        handleGoBack();
                                    }
                                    else
                                    {
                                        fetchData();
                                    }
                                })
                                .catch((error)=>{
                                    toast.error("Inputted quotation specifications are invalid.");
                                })
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
                    }) => (values.quotation !== null &&
                        <Form onSubmit={handleSubmit}>
                            <Box mb={3}>
                                <Typography
                                    color="textPrimary"
                                    variant="h2"
                                >
                                    New Quotation
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
                                            value={values.quotation ? values.quotation.project_name : ""}
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
                                                    value={values.quotation ? values.quotation.total_pages : 0}
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
                                                    value={values.quotation ? values.quotation.page_length : 0}
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
                                                    value={values.quotation ? values.quotation.page_width : 0}
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
                                                    return ( (laminationTypes && paperTypes && bindingTypes) ?
                                                    <QuotationItem
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                        values={values}
                                                        push={push}
                                                        remove={remove}
                                                        laminationTypes={laminationTypes}
                                                        paperTypes={paperTypes}
                                                        bindingTypes={bindingTypes}
                                                    /> : <></>
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