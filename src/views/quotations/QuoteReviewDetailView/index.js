import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
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
import {useInterval} from 'src/_helpers/hooks';
import {format} from 'date-fns';

import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

// import { register } from "../../_actions/auth";

import {getQuotationById, updateQuotation} from "../../../_actions/quotation";

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

const QuoteReviewDetail = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    let location = useLocation();
    const dispatch = useDispatch();

    const [openDialog, setOpenDialog] = useState(false);

    // const [quoteDetails, setQuoteDetails] = useState(null);

    const {currentQuotation : quoteDetails} = useSelector((state)=>state.quotation)

    const [paperTypes, setPaperTypes] = useState([]);
    const [laminationTypes, setLaminationTypes] = useState([])
    const [bindingTypes, setBindingTypes] = useState([])

    const [fetched, setFetched] = useState(false)
    
    const source = axios.CancelToken.source()

    async function fetchData()
    {
        try
        {
            // const quoteResult = await axios.get(`api/quotations/${location.state.id}`)
            await dispatch(getQuotationById(location.state.id,source.token))
            console.log(quoteDetails);
            // TODO: Convert these into Redux actions. Remove awaits.
            axios.get('api/papers/', {cancelToken: source.token})
                .then((response)=>{
                    // console.log(response.data)
                    setPaperTypes(response.data)
                })

            axios.get('api/laminations/',{cancelToken: source.token})
                .then((response)=>{
                    // console.log(response.data)
                    setLaminationTypes(response.data)
                })
            
             axios.get('api/bindings/', {cancelToken: source.token})
                .then((response)=>{
                    // console.log(response.data)
                    setBindingTypes(response.data)
                })
        }
        catch(error)
        {
            console.log(error);
            handleGoBack();
        }
        // console.log(quoteDetails);
    }


    const handleOpenDialog = () => 
    {
        fetchData();
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        fetchData();
        setOpenDialog(false)
    }

    const handleGoBack = () => {
        navigate('/app/quote/review')
    }

    function handleUpdateQuotation (quotation) {
        return dispatch(updateQuotation(quotation,source.token))
    }

    // TODO: Should not be calling every component mount. Should only be called during initial page load.
    useEffect(() => {
        fetchData();
        setFetched(true);
        return ()=>{
            source.cancel();
            handleGoBack();
        }
    }, [dispatch])

    // useInterval(()=>{
    //     fetchData();
    //     console.log(quoteDetails);
    //     return () =>{
    //         source.cancel();
    //         handleGoBack();
    //     }
    // }, 3000);
    // console.log(quoteDetails)
    return ( (fetched && quoteDetails && laminationTypes && paperTypes && bindingTypes) ?
        
        <Page
          className={classes.root}
          title="Quote Specifications Review"
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
                        onSubmit={async (values, actions) => {
                            // console.log(values.quotation);
                            if(values.finishComputing)
                            {
                                fetchData();
                                values.quotation.approval_status="computed";
                                await handleUpdateQuotation(values.quotation)
                                .then(response=>{
                                    toast.success("Quotation successfully submitted for approval!")
                                    navigate('/app/quote/review')
                                })
                                .catch(error=>{
                                    toast.error(error.toString())
                                })
                            }
                            else
                            {
                                fetchData();
                                await handleUpdateQuotation(values.quotation)
                                .then((response)=>{
                                    toast.success("Quotation changes successfully saved!")
                                    fetchData();
                                })
                                .catch((error)=>{
                                    toast.error(error.toString())
                                })
                                
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
                    }) => (values.quotation && fetched && quoteDetails && laminationTypes && paperTypes && bindingTypes &&
                        <Form onSubmit={handleSubmit}>
                            <Box mb={3}>
                                <Grid container>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h2"
                                        >
                                            Quotation #{values.quotation ? values.quotation.id : null}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} alignContent="flex-end">
                                        <Button
                                            color="primary"
                                            // disabled={isSubmitting}
                                            size="medium"
                                            type="button"
                                            variant="outlined"
                                            onClick={
                                                ()=>{
                                                    handleGoBack();
                                                }
                                            }
                                        >
                                            « Return to Quote Review
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Box mb={3}>
                                        {values.quotation && 
                                            <ProjectSettings
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                values={values}
                                            />
                                        }
                                        <Grid item xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h3"
                                                align="left"
                                            >
                                                Quotation Items
                                            </Typography>
                                            
                                            <FieldArray name="quotation.items">
                                                {laminationTypes && paperTypes && bindingTypes && values.quotation.items ?
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
                                                    }:
                                                    null
                                                }
                                            </FieldArray>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box mb={3}>
                                        {/* PLATES RUNNING PAPER */}
                                        
                                        {values.quotation && 
                                            <>
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
                                            </>
                                        }
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
                                        onClick={(e)=>{
                                            handleSubmit(e);
                                            handleOpenDialog();
                                        }}
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
        </Page> :
        <>
            <ClipLoader loading={true} size={150} />
        </>
    );
}

export default QuoteReviewDetail;