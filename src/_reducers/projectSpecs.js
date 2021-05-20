// TODO: Test reducer for all project-specs related actions.

import 
{ 
    RETRIEVE_ALL_LAMINATION_TYPES_SUCCESS, 
    RETRIEVE_ALL_LAMINATION_TYPES_FAIL,
    
    RETRIEVE_ALL_BINDING_TYPES_SUCCESS,
    RETRIEVE_ALL_BINDING_TYPES_FAIL,

    RETRIEVE_ALL_PAPER_TYPES_SUCCESS,
    RETRIEVE_ALL_PAPER_TYPES_FAIL
} 
from '../_actions/types';

const initialState = {
    laminationTypes : null,
    paperTypes: null,
    bindingTypes: null,
}

// eslint-disable-next-line 
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type)
    {
        case RETRIEVE_ALL_LAMINATION_TYPES_SUCCESS:
            return {
                ...state,
                laminationTypes: payload.laminationTypes,
            };
        case RETRIEVE_ALL_LAMINATION_TYPES_FAIL:
            return {
                ...state,
                laminationTypes: null
            };
        case RETRIEVE_ALL_BINDING_TYPES_SUCCESS:
            return {
                ...state,
                bindingTypes: payload.bindingTypes,
            };
        case RETRIEVE_ALL_BINDING_TYPES_FAIL:
            return {
                ...state,
                bindingTypes: null
            };
        case RETRIEVE_ALL_PAPER_TYPES_SUCCESS:
            return {
                ...state,
                paperTypes: payload.paperTypes,
            };
        case RETRIEVE_ALL_PAPER_TYPES_FAIL:
            return {
                ...state,
                paperTypes: null
            };
        default:
            return state;
    }
}