import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    PROFILE_FOUND,
    PROFILE_NOT_FOUND,
  } from "./types";
  
import AuthService from "../_services/auth.service";
  
export const register = (username, email, password, first_name="", middle_name="", last_name="") => (dispatch) => {
  return AuthService.register(username, email, password, first_name, middle_name, last_name)
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
        dispatch({
          type: LOGIN_FAIL,
        });
        return Promise.reject()
      }
    );
}
  
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
}
