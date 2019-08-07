import axios from "axios";

let cancelList = [];
const CancelToken = axios.CancelToken;

const http = {};

["get", "post", "put", "delete"].forEach(method => {
    http[method] = (...args) => {
        args[0] = CONFIG.baseURL + args[0];
        let options = args[1] || {};
        if (method === "post" || method === "put") options = args[2] || {};
        options.cancelToken = new CancelToken(function executor(callback) {
            cancelList.push(callback);
        });
        if (method === "post" || method === "put") args[2] = options;
        else
            args[1] = options;

        return axios[method](...args)
            .then(response => checkStatus(response))
            .catch(e => {
                if (!axios.isCancel()) throw e;
            });
    };
});

function checkStatus(response) {
    const {
        status,
        statusText,
        data
    } = response;
    if (status && status === 200) return data;
    else throw statusText;
}

http.cancel = () => {
    cancelList.forEach(item => item());
    cancelList = [];
};

http.form = (args) => {
    let options = args[2] || {};
    options.headers = Object.assign({}, options.headers, {
        "Content-Type": "multipart/form-data"
    });
    args[2] = options;
    if (args[1]) {
        let formData = new FormData();
        for (let key in args[1]) {
            formData.append(key, args[1][key])
        }
        args[1] = formData;
    }
    return http.post(args);
}

window.onunload = () => {
    http.cancel();
};

window.onbeforeunload = () => {
    http.cancel();
};

export default http;