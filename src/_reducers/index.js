import { combineReducers } from "redux";
import auth from "./auth";
import quotation from "./quotation";
import jobOrder from "./jobOrder";
import users from './users';

const rootReducer = combineReducers({
    auth,
    quotation,
    jobOrder,
    users,
});
export default rootReducer;