import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import quotation from "./quotation";
import jobOrder from "./jobOrder";
import users from './users';

const rootReducer = combineReducers({
    auth,
    message,
    quotation,
    jobOrder,
    users,
});
export default rootReducer;