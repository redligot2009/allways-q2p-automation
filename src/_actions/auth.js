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
  } from "./types";
  
import AuthService from "../_services/auth.service";
  
export const register = (account) => (dispatch) => {
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
};
  
export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: PROFILE_NOT_FOUND,
        });
        return Promise.reject();
      }
    );
}

export const getProfile = () => (dispatch) => {
  return AuthService.getProfile()
    .then(
      (data)=>{
        dispatch({
          type: PROFILE_FOUND,
          payload: { profile: data },
        });
        return Promise.resolve()
      },
      (error) => {
        dispatch({
          type: PROFILE_NOT_FOUND,
        });
        return Promise.reject()
      }
    );
}

export const updateProfile = (username, updatedAccount, cancelToken) => (dispatch) => {
  return AuthService.updateProfile(username,updatedAccount, cancelToken)
    .then(
      (response)=>{
        dispatch({
          type: PROFILE_UPDATE_SUCCESS,
          payload: { profile: response.data },
        });
        return Promise.resolve()
      },
      (error) => {
        dispatch({
          type: PROFILE_UPDATE_FAIL,
        });
        return Promise.reject()
      }
    );
}
  
export const logout = () => (dispatch) => {
  return AuthService.logout()
    .then((response)=>{
      dispatch({
        type: LOGOUT,
      });
      return Promise.resolve();
    })
    .catch((error)=>{
      return Promise.reject();
    })
}
