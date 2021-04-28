import {
    CREATE_JOB_ORDER_SUCCESS,
    CREATE_JOB_ORDER_FAIL
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

export const retrievePendingJobOrders = () => {
    // TODO: Implement action for retrieving pending job orders
}

export const retrieveInProgressJobOrders = () => {
    // TODO: Implement action for retrieving in progress job orders
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