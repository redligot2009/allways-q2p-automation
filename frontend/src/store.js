import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./_reducers";

const middleware = [thunk];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;