import {
    // STANDARD SINGLE QUOTATION CRUD ACTIONS
    CREATE_QUOTATION_SUCCESS,
    CREATE_QUOTATION_FAIL,
    RETRIEVE_QUOTATION_SUCCESS,
    RETRIEVE_QUOTATION_FAIL,
    UPDATE_QUOTATION_SUCCESS,
    UPDATE_QUOTATION_FAIL,
    DELETE_QUOTATION_SUCCESS,
    DELETE_QUOTATION_FAIL,

    // GET ALL QUOTATIONS
    RETRIEVE_ALL_QUOTATIONS_SUCCESS,
    RETRIEVE_ALL_QUOTATIONS_FAIL,

    // GET ALL APPROVED QUOTATIONS
    RETRIEVE_APPROVED_QUOTATIONS_SUCCESS,
    RETRIEVE_APPROVED_QUOTATIONS_FAIL,

    // GET ALL COMPUTED QUOTATIONS
    RETRIEVE_COMPUTED_QUOTATIONS_SUCCESS,
    RETRIEVE_COMPUTED_QUOTATIONS_FAIL,

    // GET ALL IN PROGRESS QUOTATIONS
    RETRIEVE_IN_PROGRESS_QUOTATIONS_SUCCESS,
    RETRIEVE_IN_PROGRESS_QUOTATIONS_FAIL,
} from '../_actions/types'

const initialState = {
    currentQuotation : null,
    allQuotations: null,
    computedQuotations: null,
    inProgressQuotations: null,
    approvedQuotations: null,
}

// eslint-disable-next-line 
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type)
    {
        case CREATE_QUOTATION_SUCCESS:
            return {
                ...state,
                currentQuotation: payload.quotation,
            };
        case CREATE_QUOTATION_FAIL:
            return {
                ...state,
                currentQuotation: null
            };
        case RETRIEVE_QUOTATION_SUCCESS:
            return {
                ...state,
                currentQuotation: payload.quotation,
            };
        case RETRIEVE_QUOTATION_FAIL:
            return {
                ...state,
                currentQuotation: null
            };
        case RETRIEVE_ALL_QUOTATIONS_SUCCESS:
            return {
                ...state,
                allQuotations: payload.quotations,
            };
        case RETRIEVE_ALL_QUOTATIONS_FAIL:
            return {
                ...state,
                allQuotations: null
            };
        case RETRIEVE_IN_PROGRESS_QUOTATIONS_SUCCESS:
            return {
                ...state,
                inProgressQuotations: payload.quotations
            }
        case RETRIEVE_IN_PROGRESS_QUOTATIONS_FAIL:
            return {
                ...state,
                inProgressQuotations: null
            }
        case RETRIEVE_COMPUTED_QUOTATIONS_SUCCESS:
            return {
                ...state,
                computedQuotations: payload.quotations
            };
        case RETRIEVE_COMPUTED_QUOTATIONS_FAIL:
            return {
                ...state,
                computedQuotations: null
            };
        case RETRIEVE_APPROVED_QUOTATIONS_SUCCESS:
            return {
                ...state,
                approvedQuotations: payload.quotations
            }
        case RETRIEVE_APPROVED_QUOTATIONS_FAIL:
            return {
                ...state,
                approvedQuotations: null
            }
        case UPDATE_QUOTATION_SUCCESS:
            return {
                ...state,
            };
        case UPDATE_QUOTATION_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}