
export default function (namespace, http) {
    return {
        namespace,
        state: {
            params: {},
            result: {}
        },
        reducers: {
            'setParams'(state, { params }) {
                return {
                    ...state,
                    params
                }
            },
            'fetchResult'(state, { result }) {
                return {
                    ...state,
                    result
                }
            },
            'clearResult'() {
                return {
                    params: {},
                    result: {}
                }
            }
        },
        effects: {
            *calculate({ params }, { put, call }) {
                yield put({ type: "setParams", params });
                const result = yield call(http, params);
                yield put({ type: "fetchResult", result });
            }
        }
    }
}
