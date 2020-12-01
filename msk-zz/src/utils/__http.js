import axios from "axios";

const CancelToken = axios.CancelToken;

window.onunload = () => {
    Http.cancel();
};

window.onbeforeunload = () => {
    Http.cancel();
};

export default class Http {
    static cancelList = [];

    static cancel = () => {
        Http.cancelList.forEach(cb => {
            typeof cb === 'function' && cb();
            cb = null;
        });
        Http.cancelList = [];
    }

    constructor(method, url, options) {
        this.options = Object.assign({ cancel: true }, options);
        this.method = method;
        this.url = url;
        this.__cancelCb = null;
        this.__instance = axios.create({
            baseURL: '',
        })
    }

    send(data, options) {
        this.cancel();
        if (this.__instance) {
            if (this.method === 'get') {
                options = data;
                data = null;
            }
            this.options = Object.assign(this.options, options);
            const { cancel: isCancel, ...restOptions } = this.options;
            this.axiosOptions = Object.assign({}, restOptions, {
                method: this.method,
                url: this.url,
                data,
                cancelToken: new CancelToken(cancelCb => {
                    Http.cancelList.push(cancelCb);
                    this.__cancelCb = cancelCb;
                })
            });
            return this.__instance
                .request(this.axiosOptions)
                .then(this.checkStatus.bind(this))
                .catch(this.handleError.bind(this));
        }
        return Promise.reject('axios created error');
    }

    checkStatus({ status, data }) {
        if (status === 200) {
            this.remove();
            if (data.success) return data.result;
            throw new Error(data.errorDesc);
        }
        throw new Error(`url: ${this.url} got some error!\nstatus: ${status}`);
    }

    handleError(e) {
        if (!axios.isCancel(e))
            this.remove();
        throw e;
    }

    remove() {
        const index = Http.cancelList.indexOf(this.__cancelCb);
        if (index > -1) Http.cancelList.splice(index, 1);
        this.__cancelCb = null;
    }

    cancel() {
        if (this.__cancelCb && this.options.cancel) {
            this.__cancelCb();
            this.remove();
        }
    }

    static get(url, options) {
        return new Http('get', url, options);
    }

    static post(url, options) {
        return new Http('post', url, options);
    }

    static upload(url, options) {
        options = options || {};
        options.headers = Object.assign({
            'Content-Type': 'multipart/form-data'
        }, options.headers);
        return new Http('post', url, options);
    }
}