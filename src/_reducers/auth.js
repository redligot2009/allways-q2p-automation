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

} from "../_actions/types";

const user = JSON.parse(localStorage.getItem("user"));
  
const initialState = user
    ? { isLoggedIn: true, user: user, profile: null }
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
                isLoggedIn: false,
                profile: null,
            }
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                profile: payload.profile
            }
        case PROFILE_UPDATE_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
  }