import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import quotation from "./quotation";
import users from './users';

const rootReducer = combineReducers({
    auth,
    message,
    quotation,
    users,
});
export default rootReducer;