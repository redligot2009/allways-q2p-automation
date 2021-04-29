import {
    CREATE_JOB_ORDER_SUCCESS,
    CREATE_JOB_ORDER_FAIL,
    RETRIEVE_IN_PROGRESS_JOB_ORDERS_SUCCESS,
    RETRIEVE_IN_PROGRESS_JOB_ORDERS_FAIL,
    RETRIEVE_PENDING_JOB_ORDERS_SUCCESS,
    RETRIEVE_PENDING_JOB_ORDERS_FAIL
} from './types';

import JobOrderService from "../_services/jobOrder.service";

export const createJobOrder = (quotation, manager) => (dispatch) => {
    // TODO: Test if createJobOrder action is functioning
    return JobOrderService.createJobOrder(quotation, manager)
        .then((response)=>{
            dispatch({
                type: CREATE_JOB_ORDER_SUCCESS,
                payload: {jobOrder: response.data}
            })
            return Promise.resolve()
        })
        .catch((error)=>{
            dispatch({type:CREATE_JOB_ORDER_FAIL})
            return Promise.reject()
        })
}

export const getPendingJobOrders = () => (dispatch) => {
    return JobOrderService.retrieveJobOrders("pending")
        .then((response)=>{
            dispatch({
                type: RETRIEVE_PENDING_JOB_ORDERS_SUCCESS,
                payload: {jobOrders: response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_PENDING_JOB_ORDERS_FAIL
            })
            return Promise.reject();
        })
}

export const getInProductionJobOrders = (client="",manager="") => (dispatch) => {
    return JobOrderService.retrieveJobOrders("inprogress",manager,client)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_IN_PROGRESS_JOB_ORDERS_SUCCESS,
                payload: {jobOrders: response.data}
            })
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_IN_PROGRESS_JOB_ORDERS_FAIL
            })
            return Promise.reject();
        })
}

export const startJobOrderProduction = (jobOrder) => {
    // TODO: Implement action for starting a pending job order
}

export const startJobOrderDelivery = (jobOrder) => {
    // TODO: Implement action for starting job order delivery
}

export const finishJobOrder = (jobOrder) => {
    // TODO: Implement action for finishing a job order.
}