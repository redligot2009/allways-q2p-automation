import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {registerReducer} from './views/auth/RegisterReducer';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: registerReducer,
  });

export default createRootReducer;
