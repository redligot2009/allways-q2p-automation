import axios from "axios";
import {getResultURL, getFilteredObject} from "../_helpers/"

/*
///////////////////////////////
JOB ORDER API SERVICE FUNCTIONS
///////////////////////////////
*/

const createJobOrder = (jobOrder) => {
  // TODO: Implement API call to create new job order from a given quotation.
  const createResult = axios.post(`api/joborders/`,jobOrder)
  return createResult;
}

const retrieveJobOrder = (id) => {
  // TODO: Implement API call to retrieve job order details by ID
  const jobOrderResult = axios.get(`api/joborders/${id}`)
  return jobOrderResult;
}

const retrieveJobOrders = (production_status="", manager="", client="") => {
  // TODO: Implement API call to retrieve list of job orders
  const urlParams = {
    "production_status" : production_status,
    "manager" : manager,
    "quotation__client__user" : client,
  }
  let requestURL = getResultURL("api/joborders/", urlParams);
  const quotationsListResult = axios.get(requestURL);
  return quotationsListResult;
}

const updateJobOrder = (jobOrder) => {
  // TODO: Implement API call to update a specific job order
  const updateResult = axios.put(`api/quotations/${jobOrder.id}/`,jobOrder)
  return updateResult;
}

const deleteJobOrder = (id) => {
  // TODO: Implement API call to delete a specific job order
}
