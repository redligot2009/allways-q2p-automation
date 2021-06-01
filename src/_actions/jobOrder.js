import {
    CREATE_JOB_ORDER_SUCCESS,
    CREATE_JOB_ORDER_FAIL,

    RETRIEVE_IN_PROGRESS_JOB_ORDERS_SUCCESS,
    RETRIEVE_IN_PROGRESS_JOB_ORDERS_FAIL,

    RETRIEVE_OUT_FOR_DELIVERY_JOB_ORDERS_SUCCESS,
    RETRIEVE_OUT_FOR_DELIVERY_JOB_ORDERS_FAIL,

    RETRIEVE_FINISHED_JOB_ORDERS_SUCCESS,
    RETRIEVE_FINISHED_JOB_ORDERS_FAIL,

    RETRIEVE_PENDING_JOB_ORDERS_SUCCESS,
    RETRIEVE_PENDING_JOB_ORDERS_FAIL,
    START_JOB_ORDER_SUCCESS,
    START_JOB_ORDER_FAIL,
    DELIVER_JOB_ORDER_SUCCESS,
    DELIVER_JOB_ORDER_FAIL,
    FINISH_JOB_ORDER_SUCCESS,
    FINISH_JOB_ORDER_FAIL
} from './types';

import JobOrderService from "../_services/jobOrder.service";

export const createJobOrder = (quotation, manager,cancelToken) => (dispatch) => {
    return JobOrderService.createJobOrder(quotation, manager,cancelToken)
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

export const getPendingJobOrders = (client="",manager="",cancelToken) => (dispatch) => {
    return JobOrderService.retrieveJobOrders("pending",manager,client,cancelToken)
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

export const getInProductionJobOrders = (client="",manager="",cancelToken) => (dispatch) => {
    return JobOrderService.retrieveJobOrders("inprogress",manager,client,cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_IN_PROGRESS_JOB_ORDERS_SUCCESS,
                payload: {jobOrders: response.data}
            })
            //console.log("SUCCESS!", response.data)
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_IN_PROGRESS_JOB_ORDERS_FAIL
            })
            //console.log(error)
            return Promise.reject();
        })
}

export const getOutForDeliveryJobOrders = (client="",manager="",cancelToken) => (dispatch) => {
    return JobOrderService.retrieveJobOrders("delivery",manager,client,cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_OUT_FOR_DELIVERY_JOB_ORDERS_SUCCESS,
                payload: {jobOrders: response.data}
            })
            //console.log("SUCCESS!", response.data)
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_OUT_FOR_DELIVERY_JOB_ORDERS_FAIL,
            })
            //console.log(error)
            return Promise.reject();
        })
}

export const getFinishedJobOrders = (client="",manager="",cancelToken) => (dispatch) => {
    return JobOrderService.retrieveJobOrders("finished",manager,client,cancelToken)
        .then((response)=>{
            dispatch({
                type: RETRIEVE_FINISHED_JOB_ORDERS_SUCCESS,
                payload: {jobOrders: response.data}
            })
            //console.log("SUCCESS!", response.data)
            return Promise.resolve();
        })
        .catch((error)=>{
            dispatch({
                type: RETRIEVE_FINISHED_JOB_ORDERS_FAIL
            })
            //console.log(error)
            return Promise.reject();
        })
}

export const startJobOrderProduction = (jobOrder,cancelToken) => (dispatch) => {
    // TODO: Implement action for starting a pending job order
    jobOrder.production_status = "inprogress";
    return JobOrderService.updateJobOrder(jobOrder,cancelToken)
        .then((response)=>{
            dispatch({
                type: START_JOB_ORDER_SUCCESS,
                payload: {jobOrder: response.data}
            })
            console.log("SUCCESS!", response.data)
            return Promise.resolve()
        })
        .catch((error)=>{
            dispatch({type:START_JOB_ORDER_FAIL})
            console.log(error, jobOrder)
            return Promise.reject()
        })
}

export const startJobOrderDelivery = (jobOrder,cancelToken)  => (dispatch) => {
    jobOrder.production_status = "delivery";
    return JobOrderService.updateJobOrder(jobOrder,cancelToken)
        .then((response)=>{
            dispatch({
                type: DELIVER_JOB_ORDER_SUCCESS,
                payload: {jobOrder: response.data}
            })
            console.log("SUCCESS!", response.data)
            return Promise.resolve()
        })
        .catch((error)=>{
            dispatch({type:DELIVER_JOB_ORDER_FAIL})
            console.log(error, jobOrder)
            return Promise.reject()
        })
    // TODO: Implement action for starting job order delivery
}

export const finishJobOrder = (jobOrder,cancelToken)  => (dispatch) => {
    jobOrder.production_status = "finished";
    return JobOrderService.updateJobOrder(jobOrder,cancelToken)
        .then((response)=>{
            dispatch({
                type: FINISH_JOB_ORDER_SUCCESS,
                payload: {jobOrder: response.data}
            })
            console.log("SUCCESS!", response.data)
            return Promise.resolve()
        })
        .catch((error)=>{
            dispatch({type:FINISH_JOB_ORDER_FAIL})
            console.log(error, jobOrder)
            return Promise.reject()
        })
    // TODO: Implement action for finishing a job order.
}