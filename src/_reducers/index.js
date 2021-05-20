import { combineReducers } from "redux";
import auth from "./auth";
import quotation from "./quotation";
import jobOrder from "./jobOrder";
import users from './users';
import projectSpecs from './projectSpecs';

const rootReducer = combineReducers({
    auth,
    quotation,
    projectSpecs,
    jobOrder,
    users,
});
export default rootReducer;