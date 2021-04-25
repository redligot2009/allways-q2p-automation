import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import quotation from "./quotation";

const rootReducer = combineReducers({
    auth,
    message,
    quotation
});
export default rootReducer;