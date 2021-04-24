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
import ProjectSettings from './ProjectSettings';
import Finishing from './Finishing';
import PlatesRunningPaper from './PlatesRunningPaper';
import ExtraCosts from './ExtraCosts';
import ProjectSummaryDialog from './ProjectSummaryDialog';

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
- ProjectSettings.js [DONE]
- PlatesRunningPaper.js [DONE]
- Finishing [DONE]
- ExtraCosts.js [DONE]
- QuotationItem.js [DONE]
- ProjectSummaryDialog.js [DONE]
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
                                        <ProjectSettings
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            values={values}
                                        />
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
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box mb={3}>
                                        {/* PLATES RUNNING PAPER */}
                                        
                                        <PlatesRunningPaper
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            values={values}
                                        />

                                        <Finishing
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            values={values}
                                        />

                                        <ExtraCosts
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            values={values}
                                        />
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
                            <ProjectSummaryDialog
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                values={values}
                                isSubmitting={isSubmitting}
                                openDialog={openDialog}
                                handleCloseDialog={handleCloseDialog}
                                handleGoBack={handleGoBack}
                                handleSubmit={handleSubmit} 
                            />
                        </Form>
                    )}  
                    </Formik>
                </Container>
            </Box>
        </Page>);
}

export default QuoteReviewDetail;