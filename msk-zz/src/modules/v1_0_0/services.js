import http from "utils/http";

export const vr = (params) =>
    http.post('/formulavr', params).then(({ result }) => result);