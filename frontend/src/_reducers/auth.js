import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    PROFILE_FOUND,
    PROFILE_NOT_FOUND,
} from "../_actions/types";
  
const user = JSON.parse(localStorage.getItem("user"));
  
const initialState = user
    ? { isLoggedIn: true, user, profile: null }
    : { isLoggedIn: false, user: null, profile: null };

// eslint-disable-next-line 
export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case PROFILE_FOUND:
            return {
                ...state,
                profile: payload.profile,
            }
        case PROFILE_NOT_FOUND:
            return {
                ...state,
                profile: null,
            }
        default:
            return state;
    }
  }