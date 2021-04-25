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
// TODO: Create new employee implementation
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
// TODO: Update employee job position
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

export const getProductionEmployees = () => {
// TODO: Implementation of retrieving production employees
  return UsersService.getEmployees("P")
    .then((response)=>{
      return Promise.resolve();
    })
    .catch((error)=>{
      return Promise.reject();
    })
}

export const getDriverEmployees = () => {
  // TODO: Implementation of retrieving driver employees
  return UsersService.getEmployees("D")
  .then((response)=>{
    return Promise.resolve();
  })
  .catch((error)=>{
    return Promise.reject();
  })
}

export const getOwnerEmployees = () => {
  // TODO: Implementation of retrieving owner employees
  return UsersService.getEmployees("O")
  .then((response)=>{
    return Promise.resolve();
  })
  .catch((error)=>{
    return Promise.reject();
  })
}

export const getAccountManagerEmployees = () => { 
  // TODO: Implementation of retrieving owner employees
  return UsersService.getEmployees("AM")
  .then((response)=>{
    return Promise.resolve();
  })
  .catch((error)=>{
    return Promise.reject();
  })
}

export const getAllAccounts = () => {
  // TODO: Implementation of retrieving all accounts
  return UsersService.getEmployees("")
  .then((response)=>{
    return Promise.resolve();
  })
  .catch((error)=>{
    return Promise.reject();
  })
}