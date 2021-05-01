import {
    // STANDARD SINGLE JOB ORDER CRUD ACTIONS
    CREATE_JOB_ORDER_SUCCESS,
    CREATE_JOB_ORDER_FAIL,

    // RETRIEVE PENDING JOB ORDERS
    RETRIEVE_PENDING_JOB_ORDERS_SUCCESS,
    RETRIEVE_PENDING_JOB_ORDERS_FAIL,

    // RETRIEVE IN PROGRESS JOB ORDERS
    RETRIEVE_IN_PROGRESS_JOB_ORDERS_SUCCESS,
    RETRIEVE_IN_PROGRESS_JOB_ORDERS_FAIL,

    // RETRIEVE OUT FOR DELIVERY JOB ORDERS
    RETRIEVE_OUT_FOR_DELIVERY_JOB_ORDERS_SUCCESS,
    RETRIEVE_OUT_FOR_DELIVERY_JOB_ORDERS_FAIL,

    // RETRIEVE FINISHED JOB ORDERS
    RETRIEVE_FINISHED_JOB_ORDERS_SUCCESS,
    RETRIEVE_FINISHED_JOB_ORDERS_FAIL

} from '../_actions/types'

const initialState = {
    currentJobOrder: null,
    pendingJobOrders: null,
    inProgressJobOrders: null,
    outForDeliveryJobOrders: null,
    finishedJobOrders : null,
}

// eslint-disable-next-line 
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type)
    {
        case CREATE_JOB_ORDER_SUCCESS:
            return {
                ...state,
                currentJobOrder: payload.jobOrder,
            };
        case CREATE_JOB_ORDER_FAIL:
            return {
                ...state,
                currentJobOrder: null
            };
        case RETRIEVE_PENDING_JOB_ORDERS_SUCCESS:
            return {
                ...state,
                pendingJobOrders: payload.jobOrders
            }
        case RETRIEVE_PENDING_JOB_ORDERS_FAIL:
            return {
                ...state,
                pendingJobOrders: null
            }
        case RETRIEVE_IN_PROGRESS_JOB_ORDERS_SUCCESS:
            return {
                ...state,
                inProgressJobOrders: payload.jobOrders
            }
        case RETRIEVE_IN_PROGRESS_JOB_ORDERS_FAIL:
            return {
                ...state,
                inProgressJobOrders: null
            }
        case RETRIEVE_OUT_FOR_DELIVERY_JOB_ORDERS_SUCCESS:
            return {
                ...state,
                outForDeliveryJobOrders: payload.jobOrders
            }
        case RETRIEVE_OUT_FOR_DELIVERY_JOB_ORDERS_FAIL:
            return {
                ...state,
                outForDeliveryJobOrders: null
            }
        case RETRIEVE_FINISHED_JOB_ORDERS_SUCCESS:
            return {
                ...state,
                finishedJobOrders: payload.jobOrders
            }
        case RETRIEVE_FINISHED_JOB_ORDERS_FAIL:
            return {
                ...state,
                finishedJobOrders: null
            }
        default:
            return state;
    }
}