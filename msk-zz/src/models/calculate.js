
export default function (namespace, http) {
    return {
        namespace,
        state: {
            params: {},
            result: {}
        },
        reducers: {
            'setParams'(_, { params }) {
                return {
                    params
                }
            },
            'fetchResult'(_, { result }) {
                return {
                    result
                }
            }
        },
        effects: {
            *calculate({ params }, { put, call }) {
                yield put({ type: "setParams", params });
                const result = yield call(http, params);
                yield put({ type: "setResult", result });
            }
        }
    }
}
