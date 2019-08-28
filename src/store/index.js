import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers, { initialState } from "./reducers";

const logger = createLogger();
function createCustomStore() {
    return createStore(
        combineReducers({
            ...reducers
        }),
        initialState,
        applyMiddleware(thunk, logger)
    );
}

export default createCustomStore();
