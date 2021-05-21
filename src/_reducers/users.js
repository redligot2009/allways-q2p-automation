import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,

    PROFILE_FOUND,
    PROFILE_NOT_FOUND,

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
} from "../_actions/types";

const initialState = {
    allUsers : null,
    productionEmployees: null,
    driverEmployees: null,
    accountManagers: null,
    owners: null,
}
// eslint-disable-next-line 
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type)
    {
        case PRODUCTION_EMPLOYEES_FOUND:
            return {
                ...state,
                productionEmployees: payload.userAccounts,
            };
        case PRODUCTION_EMPLOYEES_NOT_FOUND:
            return {
                ...state,
                prouctionEmployees: null,
            }
        case DRIVER_EMPLOYEES_FOUND:
            return {
                ...state,
                driverEmployees: payload.userAccounts
            }
        case DRIVER_EMPLOYEES_NOT_FOUND:
            return {
                ...state,
                driverEmployees: null
            }
        case OWNER_EMPLOYEES_FOUND:
            return {
                ...state,
                owners: payload.userAccounts,
            }
        case OWNER_EMPLOYEES_NOT_FOUND:
            return {
                ...state,
                owners: null,
            }
        case ACCOUNT_MANAGER_EMPLOYEES_FOUND:
            // console.log("WORKING! ", payload.userAccounts);
            return {
                ...state,
                accountManagers:  payload.userAccounts,
            }
        case ACCOUNT_MANAGER_EMPLOYEES_NOT_FOUND:
            return {
                ...state,
                accountManagers: null,
            }
        default:
            return state;
    }
}