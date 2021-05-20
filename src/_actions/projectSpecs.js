import 
{ 
    RETRIEVE_ALL_LAMINATION_TYPES_SUCCESS, 
    RETRIEVE_ALL_LAMINATION_TYPES_FAIL,
    
    RETRIEVE_ALL_BINDING_TYPES_SUCCESS,
    RETRIEVE_ALL_BINDING_TYPES_FAIL,

    RETRIEVE_ALL_PAPER_TYPES_SUCCESS,
    RETRIEVE_ALL_PAPER_TYPES_FAIL
} 
from './types';

import ProjectSpecsService from '../_services/projectSpecs.service'

// TODO: Test actions for project specs.

export const getAllLaminationTypes = (cancelToken) => (dispatch) => {
    return ProjectSpecsService.retrieveLaminationTypes(cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_ALL_LAMINATION_TYPES_SUCCESS,
                payload: { laminationTypes : response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_ALL_LAMINATION_TYPES_FAIL,
            })
            return Promise.reject();
        })
}

export const getAllBindingTypes = (cancelToken) => (dispatch) => {
    return ProjectSpecsService.retrieveBindingTypes(cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_ALL_BINDING_TYPES_SUCCESS,
                payload: { bindingTypes : response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_ALL_BINDING_TYPES_FAIL,
            })
            return Promise.reject();
        })
}

export const getAllPaperTypes = (cancelToken) => (dispatch) => {
    return ProjectSpecsService.retrievePaperTypes(cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_ALL_PAPER_TYPES_SUCCESS,
                payload: { paperTypes : response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_ALL_PAPER_TYPES_FAIL,
            })
            return Promise.reject();
        })
}
