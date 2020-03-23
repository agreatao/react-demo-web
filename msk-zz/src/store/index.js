import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function () {
    return createStore(
        combineReducers(reducers),
        {},
        composeEnhancer(
            applyMiddleware(
                thunk
            )
        )
    );
}