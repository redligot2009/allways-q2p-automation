import axios from "axios";
import authHeader from "./auth-header";
import {getFilteredObject} from "../_helpers/";

const getEmployees = (jobPosition) => {
    return axios.get(`api/accounts/?job_position=${jobPosition}`);
}

export default 
{
    getEmployees
}