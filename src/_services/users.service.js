import axios from "axios";
import authHeader from "./auth-header";
import {getFilteredObject} from "../_helpers/";

const getEmployees = (jobPosition) => {
    let resultURL = `api/accounts/?job_position=${jobPosition}`
    return axios.get(resultURL);
}

// eslint-disable-next-line
export default 
{
    getEmployees
}