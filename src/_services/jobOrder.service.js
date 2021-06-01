import axios from "axios";
import {getResultURL, getFilteredObject} from "../_helpers/"

/*
///////////////////////////////
JOB ORDER API SERVICE FUNCTIONS
///////////////////////////////
*/

const createJobOrder = (quotation, manager, cancelToken) => {
  // TODO: Test if createJobOrder functioning
  const newJobOrder = {
    quotation:  quotation.id,
    manager: manager.id,
    production_status: "pending",
  }
  const createResult = axios.post(`api/joborders/`,newJobOrder,{cancelToken: cancelToken})
  .then((response)=>{
    console.log("SUCCESS");
    console.log(response.data)
    return response;
  })
  .catch((error)=>{
    console.log("ERROR");
    console.log(error);
    console.log(JSON.stringify(newJobOrder))
    console.log(newJobOrder)
  })
  return createResult;
}

const retrieveJobOrder = (id, cancelToken) => {
 
  // TODO: Test if retrieveJobOrder functioning
  const jobOrderResult = axios.get(`api/joborders/${id}/`,{cancelToken: cancelToken})
  return jobOrderResult;
}

const retrieveJobOrders = (production_status="", manager="", client="", cancelToken) => {
  const urlParams = {
    "production_status" : production_status,
    "manager" : manager,
    "quotation__client" : client,
  }
  let requestURL = getResultURL("api/joborders/", urlParams);
  // console.log(requestURL);
  const jobOrdersListResult = axios.get(requestURL,{cancelToken: cancelToken});
  return jobOrdersListResult;
}

const updateJobOrder = (jobOrder, cancelToken) => {
  // TODO: Test if updateJobOrder functioning
  const allowedJobOrderFields = [
    'id',
    'production_status',
    'quotation',
    'manager',
  ]
  const updatedJobOrder = getFilteredObject(jobOrder,allowedJobOrderFields);
  updatedJobOrder.quotation=jobOrder.quotation.id;
  console.log(updatedJobOrder)
  const updateResult = axios.put(`api/joborders/${updatedJobOrder.id}/`,updatedJobOrder,{cancelToken: cancelToken})
  return updateResult;
}

const deleteJobOrder = (id, cancelToken) => {
  // TODO: Implement API call to delete a specific job order
}

export default {
  createJobOrder,
  retrieveJobOrder,
  retrieveJobOrders,
  updateJobOrder,
  deleteJobOrder
}