
export const fetchResult = (method, params) =>
    (dispatch) => {
        if (typeof method === 'function') {
            const promise = method(params)
            if (promise instanceof Promise)
                promise.then(data => dispatch({ type: '@Caculate/fetchResult', result: data }))
        }
    }

export const clearResult = () => ({ type: '@Caculate/clearResult' });