import axios from "axios";
import {getResultURL, getFilteredObject} from "../_helpers/"

/*
///////////////////////////////
JOB ORDER API SERVICE FUNCTIONS
///////////////////////////////
*/

const createJobOrder = (quotation, manager) => {
  // TODO: Test if createJobOrder functioning
  const createResult = axios.post(`api/joborders/`,{
    quotation:  quotation.id,
    manager: manager.id,
    production_status: "pending",
  })
  return createResult;
}

const retrieveJobOrder = (id) => {
 
  // TODO: Test if retrieveJobOrder functioning
  const jobOrderResult = axios.get(`api/joborders/${id}`)
  return jobOrderResult;
}

const retrieveJobOrders = (production_status="", manager="", client="") => {
  // TODO: Test if retrieveJobOrders functioning
  const urlParams = {
    "production_status" : production_status,
    "manager" : manager,
    "quotation__client__user" : client,
  }
  let requestURL = getResultURL("api/joborders/", urlParams);
  const jobOrdersListResult = axios.get(requestURL);
  return jobOrdersListResult;
}

const updateJobOrder = (jobOrder) => {
  // TODO: Test if updateJobOrder functioning
  const updateResult = axios.put(`api/quotations/${jobOrder.id}/`,jobOrder)
  return updateResult;
}

const deleteJobOrder = (id) => {
  // TODO: Implement API call to delete a specific job order
}

export default {
  createJobOrder,
  retrieveJobOrder,
  retrieveJobOrders,
  updateJobOrder,
  deleteJobOrder
}