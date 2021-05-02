import {
    CREATE_QUOTATION_FAIL,
    CREATE_QUOTATION_SUCCESS,
    RETRIEVE_QUOTATION_FAIL,
    RETRIEVE_QUOTATION_SUCCESS,
    UPDATE_QUOTATION_FAIL,
    UPDATE_QUOTATION_SUCCESS,
    RETRIEVE_COMPUTED_QUOTATIONS_SUCCESS,
    RETRIEVE_COMPUTED_QUOTATIONS_FAIL,
    RETRIEVE_IN_PROGRESS_QUOTATIONS_SUCCESS,
    RETRIEVE_IN_PROGRESS_QUOTATIONS_FAIL,
    RETRIEVE_APPROVED_QUOTATIONS_SUCCESS,
    RETRIEVE_APPROVED_QUOTATIONS_FAIL,
} from './types';

import QuotationService from '../_services/quotation.service';

export const createQuotation = (quotation, cancelToken) => (dispatch) => {
    return QuotationService.createQuotation(quotation)
        .then((response)=>{
            dispatch({
                type: CREATE_QUOTATION_SUCCESS,
                payload: {quotation: response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: CREATE_QUOTATION_FAIL,
            })
            return Promise.reject();
        })
}

export const updateQuotation = (quotation, cancelToken) => (dispatch) => {
    return QuotationService.updateQuotation(quotation,cancelToken)
        .then((response)=>{
            console.log("YES! ", response.data)
            dispatch({
                type: UPDATE_QUOTATION_SUCCESS,
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            console.log("WTF?")
            console.log(quotation);
            console.log(JSON.stringify(quotation));
            dispatch({
                type: UPDATE_QUOTATION_FAIL,
            })
            return Promise.reject();
        })
}

export const approveQuotation = (id,cancelToken) => (dispatch) => {
    
    return QuotationService.retrieveQuotation(id,cancelToken)
        .then((response)=>{
            
            dispatch({
                type: RETRIEVE_QUOTATION_SUCCESS,
                payload: {quotation: response.data}
            })

            let quotationToUpdate = response.data;
            quotationToUpdate.approval_status="approved";

            return QuotationService.updateQuotation(quotationToUpdate)
                .then((response)=>{
                    dispatch({
                        type: UPDATE_QUOTATION_SUCCESS,
                        payload: {quotation: response.data}
                    })
                    console.log(response.data);
                    return Promise.resolve();
                })
                .catch((error)=>{
                    dispatch({
                        type: UPDATE_QUOTATION_FAIL
                    })
                    console.log(error);
                    console.log(quotationToUpdate);
                    console.log(JSON.stringify(quotationToUpdate));
                    return Promise.reject();
                })
            
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_QUOTATION_FAIL,
            })
            console.log(error);
            return Promise.reject();
        })
}

export const archiveQuotation = (id,cancelToken) => (dispatch) => {
    
    return QuotationService.retrieveQuotation(id,cancelToken)
        .then((response)=>{
            
            dispatch({
                type: RETRIEVE_QUOTATION_SUCCESS,
                payload: {quotation: response.data}
            })

            let quotationToUpdate = response.data;
            quotationToUpdate.approval_status="archived";

            return QuotationService.updateQuotation(quotationToUpdate)
                .then((response)=>{
                    dispatch({
                        type: UPDATE_QUOTATION_SUCCESS,
                        payload: {quotation: response.data}
                    })
                    return Promise.resolve();
                })
                .catch((error)=>{
                    dispatch({
                        type: UPDATE_QUOTATION_FAIL,
                        payload: {quotation: response.data}
                    })
                    return Promise.reject();
                })
            
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_QUOTATION_FAIL,
            })
            return Promise.reject();
        })
}

export const getQuotationById = (id, cancelToken) => (dispatch) => {
    return QuotationService.retrieveQuotation(id, cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_QUOTATION_SUCCESS,
                payload: {quotation: response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type:RETRIEVE_COMPUTED_QUOTATIONS_FAIL,
            })
            return Promise.reject();
        })
};

export const getComputedQuotations = (client="", cancelToken) => (dispatch) => {
    return QuotationService.retrieveQuotations("computed",client,cancelToken)
        .then((response)=>{
            // console.log(response.data);
            dispatch({
                type: RETRIEVE_COMPUTED_QUOTATIONS_SUCCESS,
                payload: {quotations: response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_COMPUTED_QUOTATIONS_FAIL,
            })
            return Promise.reject();
        })
}

export const getInProgressQuotations = (client="", cancelToken) => (dispatch) => {
    return QuotationService.retrieveQuotations("in_progress",client,cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_IN_PROGRESS_QUOTATIONS_SUCCESS,
                payload: {quotations: response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_IN_PROGRESS_QUOTATIONS_FAIL
            })
            return Promise.reject();
        })
}

export const getApprovedQuotations = (cancelToken) => (dispatch) => {
    return QuotationService.retrieveQuotations("approved","",cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_APPROVED_QUOTATIONS_SUCCESS,
                payload: {quotations: response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_APPROVED_QUOTATIONS_FAIL,
            })
            return Promise.reject();
        })
}