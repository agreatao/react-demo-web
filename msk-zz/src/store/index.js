import { upperCase } from 'lodash';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function (options = {}) {
    const reducers = {
        routes() {
            return options.routes;
        },
        tips(state = {}, { type, ...props }) {
            switch (type) {
                case '@Locale/CHANGE': {
                    const { method } = props;
                    return {
                        'INSTRUCTIONS': `${upperCase(method)}_INSTRUCTIONS`,
                        'NOTES': `${upperCase(method)}_NOTES`
                    }
                };
                default: return state;
            }
        },
        caculate(state = {}, { type, ...props }) {
            switch (type) {
                case '@Locale/CHANGE': {
                    const { method } = props;
                    return {
                        format: true,
                        ...options.caculate[method],
                        result: {}
                    };
                };
                case '@Caculate/fetchResult': return {
                    ...state,
                    ...props
                };
                case '@Caculate/clearResult': return {
                    ...state,
                    result: {}
                }
                default: return state;
            }
        }
    };

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