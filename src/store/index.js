import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

const logger = createLogger();
function createCustomStore() {
    return createStore(
        combineReducers({
            ...reducers
        }),
        applyMiddleware(thunk, logger)
    );
}

export default createCustomStore();