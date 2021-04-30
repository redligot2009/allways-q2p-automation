import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    PROFILE_FOUND,
    PROFILE_NOT_FOUND,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    ALL_ACCOUNTS_FOUND,
    ALL_ACCOUNTS_NOT_FOUND,
    CLIENTS_FOUND,
    CLIENTS_NOT_FOUND,
    PRODUCTION_EMPLOYEES_FOUND,
    PRODUCTION_EMPLOYEES_NOT_FOUND,
    DRIVER_EMPLOYEES_FOUND,
    DRIVER_EMPLOYEES_NOT_FOUND,
    ACCOUNT_MANAGER_EMPLOYEES_FOUND,
    ACCOUNT_MANAGER_EMPLOYEES_NOT_FOUND,
    OWNER_EMPLOYEES_FOUND,
    OWNER_EMPLOYEES_NOT_FOUND,
} from "./types";
  
import AuthService from "../_services/auth.service";
import UsersService from "../_services/users.service";

export const createNewEmployee = (account) => (dispatch) => {

  return AuthService.register(account)
      .then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });
            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: REGISTER_FAIL,
            });
            return Promise.reject();
        }
      );
}

export const updateEmployeeProfile = (username, account) => (dispatch) => {

  return AuthService.updateProfile(username.account)
    .then((response)=>{
      dispatch({
        type: PROFILE_UPDATE_SUCCESS
      })
      return Promise.resolve();
    })
    .catch((error)=>{
      dispatch({
        type: PROFILE_UPDATE_FAIL
      })
      return Promise.reject();
    })
}

export const getProductionEmployees = () => (dispatch) => {

  return UsersService.getEmployees("P")
    .then((response)=>{
      dispatch({
        type: PRODUCTION_EMPLOYEES_FOUND,
        payload: {userAccounts: response.data}
      })
      return Promise.resolve();
    })
    .catch((error)=>{
      dispatch({
        type: PRODUCTION_EMPLOYEES_NOT_FOUND
      })
      return Promise.reject();
    })
}

export const getDriverEmployees = () => (dispatch) => {

  return UsersService.getEmployees("D")
    .then((response)=>{
      dispatch({
        type: DRIVER_EMPLOYEES_FOUND,
        payload: {userAccounts: response.data}
      })
      return Promise.resolve();
    })
    .catch((error)=>{
      dispatch({
        type: DRIVER_EMPLOYEES_NOT_FOUND
      })
      return Promise.reject();
    })
}

export const getOwnerEmployees = () => (dispatch) =>{

  return UsersService.getEmployees("O")
    .then((response)=>{
      dispatch({
        type: OWNER_EMPLOYEES_FOUND,
        payload: {userAccounts: response.data}
      })
      return Promise.resolve();
    })
    .catch((error)=>{
      dispatch({
        type: OWNER_EMPLOYEES_NOT_FOUND
      })
      return Promise.reject();
    })
}

export const getAccountManagerEmployees = () => (dispatch) =>{ 

  return UsersService.getEmployees("AM")
  .then((response)=>{
    dispatch({
      type: ACCOUNT_MANAGER_EMPLOYEES_FOUND,
      payload: {userAccounts: response.data}
    })
    console.log(response.data)
    return Promise.resolve();
  })
  .catch((error)=>{
    dispatch({
      type: ACCOUNT_MANAGER_EMPLOYEES_NOT_FOUND
    })
    console.log(error)
    return Promise.reject();
  })
}

export const getAllAccounts = () => (dispatch) =>{

  return UsersService.getEmployees("")
    .then((response)=>{
      dispatch({
        type: ALL_ACCOUNTS_FOUND,
        payload: {userAccounts: response.data}
      })
      return Promise.resolve();
    })
    .catch((error)=>{
      dispatch({
        type: ALL_ACCOUNTS_NOT_FOUND
      })
      return Promise.reject();
    })
}