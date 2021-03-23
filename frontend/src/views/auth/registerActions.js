import {
    CREATE_USER_ERROR,
    CREATE_USER_SUBMITTED,
    CREATE_USER_SUCCESS
} from './RegisterTypes';

import axios from "axios";

export const registerNewUser = userData => dispatch => {
    dispatch({type:CREATE_USER_SUBMITTED});
    axios
        .post("/auth/users",userData)
        .then(response => {
            dispatch({type:CREATE_USER_SUCCESS});
        })
        .catch(error=>{
            dispatch({type:CREATE_USER_ERROR});
        });
};