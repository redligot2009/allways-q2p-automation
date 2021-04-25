import axios from 'axios';
import {getResultURL, getFilteredObject} from "../_helpers/"

const createEmployee = (account) => {
    let result = axios.post("auth/users/", account)
      .then((response) => {
        axios.put(`api/accounts/${account.user.username}/`, account.user)
      });
    return result;
}

const retrieveEmployees = (jobPosition=null) => {
    // TODO: Implement API call to retrieve employees
}

const retrieveEmployeeByUsername = (username) => {
    // TODO: Implement API call to retrieve single employee by username
}

const updateEmployee = (account) => {
    // TODO: Implement API call to update employee fields.
}

// eslint-disable-next-line
export default 
{
    retrieveEmployees,
    retrieveEmployeeByUsername,
    updateEmployee,
}